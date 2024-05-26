import Stripe from 'stripe';
import { Service } from '../models/ServiceSchema.js';
import { MigrationAgent } from '../models/MigrationAgentSchema.js';
import { Booking } from '../models/BookingSchema.js';
const stripe = new Stripe("sk_test_51PIFiAFdq3SMwAKa5PSG4mWWwsyVJap6XCXFhv6ofUwAjZWXUPn6IS5uKPtmgrndnDNKSCGJvov1mEZtaOk6GPdh00dnsTmIuQ");

export const Checkout = async (req, res) => {
    try {
        const { serviceId, agentMARN, date, time, customerFirstName, customerLastName, customerPhoneNumber, customerEmail } = req.body;

        // Check if a similar booking already exists
        const existingBooking = await Booking.findOne({
            serviceId,
            agentMARN,
            date,
            time,
            customerEmail
        });

        if (existingBooking) {
            return res.status(200).json({ success: false, msg: 'Booking already exists', bookingId: existingBooking._id });
        }

        const service = await Service.findOne({ id: serviceId });
        if (!service) {
            return res.status(404).json({ success: false, msg: "Service not found" });
        }

        const agent = await MigrationAgent.findOne({ MARN: agentMARN });
        if (!agent) {
            return res.status(404).json({ success: false, msg: "Agent not found" });
        }

        const priceInCents = parseFloat(service.Price) * 100;
        if (isNaN(priceInCents)) {
            throw new Error('Invalid price: Not a number');
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: 'http://localhost:3000/bookanappointment?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: 'http://localhost:3000/checkout-cancel',
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        unit_amount: priceInCents,
                        product_data: {
                            name: service.VisaType,
                        },
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                serviceId,
                agentMARN,
                date,
                time,
                customerFirstName,
                customerLastName,
                customerPhoneNumber,
                customerEmail
            }
        });

        res.status(200).json({
            success: true,
            sessionUrl: session.url,
        });
    } catch (error) {
        console.error('Error creating checkout session:', error.message, error.stack);
        res.status(500).json({
            success: false,
            msg: "Error creating checkout session",
            error: error.message,
        });
    }
};
export const confirmBooking = async (req, res) => {
    try {
        const { sessionId } = req.body;
        console.log(`Confirm booking called with sessionId: ${sessionId}`);

        const session = await stripe.checkout.sessions.retrieve(sessionId);
        console.log(`Session retrieved: ${JSON.stringify(session)}`);

        if (session.payment_status === 'paid') {
            const {
                serviceId,
                agentMARN,
                date,
                time,
                customerFirstName,
                customerLastName,
                customerPhoneNumber,
                customerEmail
            } = session.metadata;

            // Check if a similar booking already exists
            const existingBooking = await Booking.findOne({
                serviceId,
                agentMARN,
                date,
                time,
                customerEmail
            });

            if (existingBooking) {
                console.log(`Booking already exists: ${existingBooking._id}`);
                return res.status(200).json({ success: true, msg: 'Booking already exists', bookingId: existingBooking._id });
            }

            const newBooking = await Booking.create({
                serviceId,
                agentMARN,
                date,
                time,
                customerFirstName,
                customerLastName,
                customerPhoneNumber,
                customerEmail
            });

            console.log(`Booking created successfully: ${newBooking._id}`);
            res.status(200).json({ success: true, msg: 'Booking created successfully', bookingId: newBooking._id });
        } else {
            console.log('Payment not completed');
            res.status(400).json({ success: false, msg: 'Payment not completed' });
        }
    } catch (error) {
        console.error('Error confirming booking:', error.message, error.stack);
        res.status(500).json({
            success: false,
            msg: 'Error confirming booking',
            error: error.message,
        });
    }
};
