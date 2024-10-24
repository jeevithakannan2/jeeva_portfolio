import React, { useState } from 'react';
import './Contact.css';
import theme_pattern from '../../assets/theme_pattern.svg';
import mail_icon from '../../assets/mail_icon.svg';
import location_icon from '../../assets/location_icon.svg';
import call_icon from '../../assets/call_icon.svg';

const Contact = () => {
    // State for form data
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    // Handle input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const onSubmit = async (event) => {
        event.preventDefault();

        // Append access key to form data
        const dataToSubmit = {
            ...formData,
            access_key: import.meta.env.VITE_API_KEY,
        };

        const json = JSON.stringify(dataToSubmit);

        // Send the data to the API
        const res = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: json,
        }).then((res) => res.json());

        // Handle success response
        if (res.success) {
            console.log("Success", res);
            alert(res.message);

            // Clear the form fields after successful submission
            setFormData({
                name: '',
                email: '',
                message: '',
            });
        }
    };

    return (
        <div id='contact' className='contact'>
            <div className="contact-title">
                <h1>Get in touch</h1>
                <img src={theme_pattern} alt="" />
            </div>
            <div className="contact-section">
                <div className="contact-left">
                    <h1>Let's talk</h1>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem nihil natus libero, quaerat enim obcaecati nostrum quae illum, alias a optio ab laboriosam, quod iste nesciunt cupiditate harum? Perferendis, ducimus.</p>
                    <div className="contact-details">
                        <div className="contact-detail">
                            <img src={mail_icon} alt="" /><p>ksjeevithakannan123@gmail.com</p>
                        </div>
                        <div className="contact-detail">
                            <img src={call_icon} alt="" /> <p>+91 86675 10219</p>
                        </div>
                        <div className="contact-detail">
                            <img src={location_icon} alt="" /> <p>Erode, Tamil Nadu, India</p>
                        </div>
                    </div>
                </div>
                <form onSubmit={onSubmit} className="contact-right">
                    <label htmlFor="name">Your Name</label>
                    <input
                        type="text"
                        placeholder='Enter your name'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <label htmlFor="email">Your Email</label>
                    <input
                        type="email"
                        placeholder='Enter your email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <label htmlFor="message">Write your message here</label>
                    <textarea
                        name="message"
                        rows="8"
                        placeholder='Enter your message here...'
                        value={formData.message}
                        onChange={handleChange}
                    ></textarea>
                    <button type='submit' className='contact-submit'>Submit Now</button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
