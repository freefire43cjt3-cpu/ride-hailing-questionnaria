import React, { useState } from "react";
import "./App.css";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mbgjjdqg";

const Field = ({ label, name, required = false, children, hint }) => (
  <div className="field">
    <label htmlFor={name}>
      {label} {required && <span className="required">*</span>}
    </label>
    {children}
    {hint && <small>{hint}</small>}
  </div>
);

const Input = ({ name, label, type = "text", required = false, placeholder, hint }) => (
  <Field label={label} name={name} required={required} hint={hint}>
    <input
      id={name}
      name={name}
      type={type}
      placeholder={placeholder || "Enter your answer"}
      required={required}
    />
  </Field>
);

const Select = ({ name, label, options, required = false }) => (
  <Field label={label} name={name} required={required}>
    <select id={name} name={name} required={required} defaultValue="">
      <option value="" disabled>Select an option</option>
      {options.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </Field>
);

const Textarea = ({ name, label, placeholder, required = false, hint }) => (
  <Field label={label} name={name} required={required} hint={hint}>
    <textarea
      id={name}
      name={name}
      placeholder={placeholder || "Write your answer here..."}
      required={required}
      rows="4"
    />
  </Field>
);

const CheckGroup = ({ name, label, options, hint }) => (
  <div className="field">
    <label>{label}</label>
    <div className="check-grid">
      {options.map((option) => (
        <label className="check-option" key={option}>
          <input type="checkbox" name={name} value={option} />
          <span>{option}</span>
        </label>
      ))}
    </div>
    {hint && <small>{hint}</small>}
  </div>
);

const RadioGroup = ({ name, label, options, required = false }) => (
  <div className="field">
    <label>{label} {required && <span className="required">*</span>}</label>
    <div className="radio-grid">
      {options.map((option) => (
        <label className="radio-option" key={option}>
          <input
            type="radio"
            name={name}
            value={option}
            required={required}
          />
          <span>{option}</span>
        </label>
      ))}
    </div>
  </div>
);

const Section = ({ number, title, description, children }) => (
  <section className="form-section">
    <div className="section-heading">
      <span className="section-number">{number}</span>
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
    <div className="section-content">{children}</div>
  </section>
);

function App() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSubmitting(true);
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    formData.append("_subject", "New Ride-Hailing Website Project Questionnaire - RAY DIGITAL");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setError(
          result.errors?.map((item) => item.message).join(", ") ||
          "Your submission could not be completed. Please try again."
        );
      }
    } catch (err) {
      setError("Network error. Please check your internet connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <main className="success-page">
        <div className="success-card">
          <div className="success-icon">✓</div>
          <span className="eyebrow">RAY DIGITAL / SUBMISSION RECEIVED</span>
          <h1>Thank you for your submission.</h1>
          <p>
            Your project information has been successfully submitted.
            RAY DIGITAL will review your requirements and use the information
            provided to prepare the next stage of your website project.
          </p>
          <div className="success-notice">
            <strong>What happens next?</strong>
            <p>
              Your requirements will be reviewed before development begins.
              We will contact you if additional information or clarification
              is required.
            </p>
          </div>
          <div className="success-brand">RAY <span>DIGITAL</span></div>
          <p className="success-footer">YOUR BUSINESS. ONLINE.</p>
        </div>
      </main>
    );
  }

  return (
    <div className="app">
      <header className="topbar">
        <a href="#home" className="brand">
          RAY <span>DIGITAL</span><b>®</b>
        </a>
        <div className="topbar-right">
          <span className="status-dot"></span>
          PROJECT DISCOVERY
        </div>
      </header>

      <main id="home">
        <section className="hero">
          <div className="hero-content">
            <div className="hero-label">
              <span></span> WEBSITE PROJECT QUESTIONNAIRE
            </div>

            <h1>
              Let's build something
              <span> remarkable.</span>
            </h1>

            <p className="hero-description">
              A detailed project questionnaire designed to understand your
              business, services, customers and expectations. Your answers
              will help us plan and develop a website that aligns with your
              business objectives.
            </p>

            <div className="hero-meta">
              <div>
                <strong>01</strong>
                <span>PROJECT DETAILS</span>
              </div>
              <div>
                <strong>02</strong>
                <span>FUNCTIONALITY</span>
              </div>
              <div>
                <strong>03</strong>
                <span>DESIGN & DELIVERY</span>
              </div>
            </div>
          </div>

          <div className="hero-decoration">
            <div className="orbit orbit-one"></div>
            <div className="orbit orbit-two"></div>
            <div className="orbit-center">
              <span>R</span>
              <small>RD.</small>
            </div>
            <div className="orbit-tag">DIGITAL EXPERIENCE</div>
          </div>
        </section>

        <div className="intro-strip">
          <div>
            <span className="strip-indicator"></span>
            CLIENT PROJECT BRIEF
          </div>
          <p>PLEASE COMPLETE ALL REQUIRED SECTIONS</p>
        </div>

        <section className="form-intro">
          <div>
            <span className="eyebrow">BEFORE WE BEGIN</span>
            <h2>Tell us about your vision.</h2>
            <p>
              Please provide accurate information about your business and
              the website you want. The more details you provide, the better
              we can understand your expectations.
            </p>
          </div>
          <div className="required-note">
            <span className="required">*</span> Required questions
          </div>
        </section>

        <form onSubmit={handleSubmit} className="project-form">

          {/* SECTION 01 */}
          <Section
            number="01"
            title="Business Information"
            description="Let's start with the identity and background of your company."
          >
            <Input
              name="company_name"
              label="Official company or business name"
              required
            />
            <Input
              name="brand_name"
              label="Preferred brand name for the website"
              hint="If different from the official company name."
            />
            <Input
              name="tagline"
              label="Company slogan or tagline"
              placeholder="Enter your company slogan, if available"
            />
            <Textarea
              name="business_description"
              label="Tell us about your business"
              required
              placeholder="What does your company do? How did it start? What makes it different?"
            />
            <Input
              name="business_email"
              label="Official business email address"
              type="email"
              required
            />
            <Input
              name="business_phone"
              label="Official business phone number"
              required
            />
            <Input
              name="whatsapp_number"
              label="Business WhatsApp number"
            />
            <Input
              name="business_address"
              label="Business office address"
            />
            <Input
              name="existing_website"
              label="Existing website (if any)"
              placeholder="https://"
            />
            <Input
              name="social_media"
              label="Social media links"
              placeholder="Instagram, Facebook, TikTok, etc."
            />
          </Section>

          {/* SECTION 02 */}
          <Section
            number="02"
            title="Business Goals & Audience"
            description="Help us understand what the website should achieve."
          >
            <Textarea
              name="website_goals"
              label="What are the main goals of this website?"
              required
              placeholder="What do you want customers to accomplish when they visit?"
            />
            <CheckGroup
              name="target_audience"
              label="Who are your primary customers?"
              options={[
                "Individuals",
                "Families",
                "Business owners",
                "Market traders",
                "Students",
                "Workers and professionals",
                "Companies and organizations",
                "Online shoppers",
                "Other"
              ]}
            />
            <CheckGroup
              name="target_locations"
              label="Which areas should the service cover?"
              options={[
                "Abia State",
                "Anambra State",
                "Ebonyi State",
                "Enugu State",
                "Imo State",
                "Other parts of Nigeria"
              ]}
            />
            <Textarea
              name="specific_cities"
              label="List the specific cities, towns or communities you intend to cover"
              placeholder="For example: Aba, Umuahia, Onitsha, Awka, Enugu, Owerri..."
            />
            <Textarea
              name="customer_problem"
              label="What problems are you trying to solve for customers?"
            />
            <Textarea
              name="competitors"
              label="Are there similar businesses or platforms you admire?"
              placeholder="You may provide names or website links."
            />
            <Textarea
              name="competitive_advantage"
              label="What makes your service different from competitors?"
            />
          </Section>

          {/* SECTION 03 */}
          <Section
            number="03"
            title="Ride-Hailing Services"
            description="Tell us how customers should be able to request transportation."
          >
            <CheckGroup
              name="ride_categories"
              label="What types of rides will you offer?"
              options={[
                "Standard private rides",
                "Economy rides",
                "Premium rides",
                "Executive rides",
                "Shared rides",
                "Business transportation",
                "Airport transportation",
                "Scheduled rides",
                "Other"
              ]}
            />
            <Textarea
              name="vehicle_types"
              label="What types of vehicles will be available?"
              placeholder="Cars, SUVs, buses, tricycles, etc."
            />
            <RadioGroup
              name="ride_booking_method"
              label="How should customers book rides?"
              options={[
                "Through the website",
                "Through the mobile app",
                "Both website and mobile app"
              ]}
              required
            />
            <RadioGroup
              name="booking_schedule"
              label="Should customers be able to schedule rides in advance?"
              options={["Yes", "No", "Not sure yet"]}
            />
            <RadioGroup
              name="instant_booking"
              label="Should customers be able to request immediate rides?"
              options={["Yes", "No", "Both immediate and scheduled"]}
            />
            <Textarea
              name="ride_booking_details"
              label="Describe how you imagine the ride-booking process"
              placeholder="Explain what the customer should do from selecting a pickup location to confirming a ride."
            />
          </Section>

          {/* SECTION 04 */}
          <Section
            number="04"
            title="Goods & Delivery Transportation"
            description="We also need to understand your logistics and goods transportation services."
          >
            <RadioGroup
              name="delivery_service"
              label="Will the platform support goods transportation?"
              options={["Yes", "No", "Possibly in the future"]}
              required
            />
            <CheckGroup
              name="delivery_categories"
              label="What types of goods or deliveries will be supported?"
              options={[
                "Market purchases",
                "Food and groceries",
                "Business supplies",
                "Small packages",
                "Large packages",
                "Household items",
                "Commercial goods",
                "Bulk cargo",
                "Other"
              ]}
            />
            <CheckGroup
              name="delivery_vehicles"
              label="What vehicles will be used for goods transportation?"
              options={[
                "Cars",
                "Tricycles",
                "Pickup trucks",
                "Delivery vans",
                "Small trucks",
                "Large trucks",
                "Motorcycles",
                "Other"
              ]}
            />
            <RadioGroup
              name="delivery_booking"
              label="Should customers book delivery services directly on the website?"
              options={["Yes", "No", "Through the app only"]}
            />
            <Textarea
              name="delivery_process"
              label="Explain how customers should request goods transportation"
              placeholder="What details should customers provide about their goods?"
            />
            <Textarea
              name="delivery_restrictions"
              label="Are there goods or items that the platform will not transport?"
            />
          </Section>

          {/* SECTION 05 */}
          <Section
            number="05"
            title="Booking & Location Features"
            description="Define how customers will enter their locations and manage bookings."
          >
            <CheckGroup
              name="booking_fields"
              label="What information should a customer provide when booking?"
              options={[
                "Pickup address",
                "Destination address",
                "Current location",
                "Pickup date",
                "Pickup time",
                "Passenger count",
                "Phone number",
                "Type of vehicle",
                "Description of goods",
                "Special instructions"
              ]}
            />
            <RadioGroup
              name="map_integration"
              label="Should the website display an interactive map?"
              options={["Yes", "No", "Not sure yet"]}
            />
            <RadioGroup
              name="live_tracking"
              label="Should customers be able to track drivers in real time?"
              options={["Yes", "No", "Future phase"]}
            />
            <RadioGroup
              name="fare_estimation"
              label="Should customers see estimated fares before confirming?"
              options={["Yes", "No", "Not sure yet"]}
            />
            <RadioGroup
              name="booking_confirmation"
              label="How should customers receive booking confirmation?"
              options={[
                "Website notification",
                "SMS",
                "WhatsApp",
                "Email",
                "Multiple methods"
              ]}
            />
            <Textarea
              name="location_details"
              label="Any special location or address requirements?"
              placeholder="For example, landmarks, market names, streets and nearby communities."
            />
          </Section>

          {/* SECTION 06 */}
          <Section
            number="06"
            title="Voice Booking & Accessibility"
            description="Tell us how customers should interact with the website using their voice."
          >
            <RadioGroup
              name="voice_feature"
              label="Should customers be able to use their voice to enter booking details?"
              options={["Yes", "No", "Not sure yet"]}
            />
            <RadioGroup
              name="voice_type"
              label="Which voice functionality do you expect?"
              options={[
                "Voice-to-text address entry",
                "Voice recording and submission",
                "Both options",
                "I need guidance"
              ]}
            />
            <Textarea
              name="voice_explanation"
              label="How should the voice feature work?"
              placeholder="For example, a customer speaks their pickup and destination addresses, and the website fills in the booking fields."
            />
            <RadioGroup
              name="accessibility"
              label="Should the website be designed to support users with accessibility needs?"
              options={["Yes", "No", "Not sure yet"]}
            />
          </Section>

          {/* SECTION 07 */}
          <Section
            number="07"
            title="Language & Translation"
            description="Help us make the platform accessible to customers across different communities."
          >
            <CheckGroup
              name="website_languages"
              label="Which languages should the website support?"
              options={[
                "English",
                "Igbo",
                "Pidgin English",
                "Hausa",
                "Yoruba",
                "Other"
              ]}
            />
            <RadioGroup
              name="translation_method"
              label="How should customers change the website language?"
              options={[
                "Manual language selector",
                "Automatic language detection",
                "Both options",
                "Need your recommendation"
              ]}
            />
            <Textarea
              name="translation_details"
              label="Any additional translation requirements?"
              placeholder="Tell us about specific words, local expressions or languages you want supported."
            />
          </Section>

          {/* SECTION 08 */}
          <Section
            number="08"
            title="Mobile Application Integration"
            description="We need to understand how the website will connect with your mobile application."
          >
            <RadioGroup
              name="app_status"
              label="What is the current status of your mobile application?"
              options={[
                "Currently being developed",
                "Already completed",
                "Planning to develop it",
                "Not yet decided"
              ]}
              required
            />
            <CheckGroup
              name="app_platforms"
              label="Which platforms will the mobile app support?"
              options={[
                "Android",
                "iOS",
                "Both Android and iOS",
                "Not decided"
              ]}
            />
            <Input
              name="android_app_link"
              label="Google Play Store app link"
              placeholder="Paste link when available"
            />
            <Input
              name="ios_app_link"
              label="Apple App Store app link"
              placeholder="Paste link when available"
            />
            <Input
              name="app_developer"
              label="Who is developing the mobile application?"
            />
            <RadioGroup
              name="app_connection"
              label="Should the website connect to the mobile app's booking system?"
              options={["Yes", "No", "Not sure yet"]}
            />
            <Textarea
              name="app_integration_details"
              label="Explain how you want the website and mobile app to work together"
              placeholder="For example, app download links, shared accounts, bookings and synchronized information."
            />
          </Section>

          {/* SECTION 09 */}
          <Section
            number="09"
            title="Payments & Pricing"
            description="Tell us how customers will pay for rides and delivery services."
          >
            <CheckGroup
              name="payment_methods"
              label="Which payment methods will you support?"
              options={[
                "Cash",
                "Bank transfer",
                "Debit cards",
                "Online payments",
                "Wallet balance",
                "Other"
              ]}
            />
            <RadioGroup
              name="online_payment"
              label="Should customers be able to pay online through the website?"
              options={["Yes", "No", "Future phase"]}
            />
            <Input
              name="payment_provider"
              label="Preferred payment provider"
              placeholder="Paystack, Flutterwave, etc. or Not decided"
            />
            <RadioGroup
              name="fare_calculation"
              label="How should ride prices be calculated?"
              options={[
                "Fixed prices",
                "Distance-based pricing",
                "Vehicle-based pricing",
                "Admin-controlled pricing",
                "Combination of methods",
                "Not decided"
              ]}
            />
            <Textarea
              name="pricing_details"
              label="Explain your pricing structure"
              placeholder="Provide any known fare rates, delivery fees or pricing rules."
            />
          </Section>

          {/* SECTION 10 */}
          <Section
            number="10"
            title="Drivers & Administration"
            description="Let's understand how the company will manage drivers, customers and operations."
          >
            <RadioGroup
              name="driver_registration"
              label="Should drivers be able to register through the website?"
              options={["Yes", "No", "Through the app only"]}
            />
            <CheckGroup
              name="driver_details"
              label="What information should driver registration collect?"
              options={[
                "Full name",
                "Phone number",
                "Email address",
                "Profile photo",
                "Driver's licence",
                "Vehicle information",
                "Vehicle documents",
                "Identification documents"
              ]}
            />
            <RadioGroup
              name="admin_dashboard"
              label="Should the company have an admin dashboard?"
              options={["Yes", "No", "Need your recommendation"]}
            />
            <CheckGroup
              name="admin_features"
              label="What should administrators be able to manage?"
              options={[
                "Customer accounts",
                "Driver accounts",
                "Ride bookings",
                "Delivery bookings",
                "Payments",
                "Pricing",
                "Service locations",
                "Customer enquiries",
                "Reports and analytics",
                "Promotions"
              ]}
            />
            <Textarea
              name="admin_details"
              label="Describe any other administrative requirements"
            />
          </Section>

          {/* SECTION 11 */}
          <Section
            number="11"
            title="Website Design & Brand Identity"
            description="Let's establish the visual direction of your website."
          >
            <Input
              name="logo_status"
              label="Do you currently have a company logo?"
              placeholder="Yes / No / In development"
            />
            <Input
              name="logo_link"
              label="Logo file or reference link"
              placeholder="Provide a link if available"
            />
            <Input
              name="brand_colors"
              label="Preferred brand colours"
              placeholder="Black background and green text"
            />
            <RadioGroup
              name="design_style"
              label="What design style do you prefer?"
              options={[
                "Modern and minimal",
                "Premium and corporate",
                "Bold and futuristic",
                "Simple and user-friendly",
                "A combination"
              ]}
            />
            <Textarea
              name="website_references"
              label="Are there websites whose designs you admire?"
              placeholder="Paste any reference website links."
            />
            <Textarea
              name="design_notes"
              label="Describe how you imagine the finished website"
              placeholder="Tell us about your preferred layout, animations, appearance and overall experience."
            />
            <RadioGroup
              name="mobile_responsive"
              label="Should the website be fully optimized for mobile phones and tablets?"
              options={["Yes", "Absolutely"]}
              required
            />
          </Section>

          {/* SECTION 12 */}
          <Section
            number="12"
            title="Website Content & Media"
            description="What materials will be available for the website?"
          >
            <CheckGroup
              name="available_materials"
              label="Which materials can the company provide?"
              options={[
                "Company logo",
                "Business photographs",
                "Vehicle photographs",
                "Driver photographs",
                "Office photographs",
                "Company videos",
                "Service descriptions",
                "Customer testimonials",
                "Brand guidelines"
              ]}
            />
            <RadioGroup
              name="content_ready"
              label="Is your website content already prepared?"
              options={[
                "Yes, everything is ready",
                "Some content is ready",
                "No, content needs to be prepared"
              ]}
            />
            <Textarea
              name="content_notes"
              label="Additional content requirements"
            />
          </Section>

          {/* SECTION 13 */}
          <Section
            number="13"
            title="Security, Support & Legal"
            description="A reliable platform needs clear security and operational requirements."
          >
            <CheckGroup
              name="security_features"
              label="Which security features are important to your business?"
              options={[
                "Secure customer accounts",
                "Driver verification",
                "Admin authentication",
                "Secure payment processing",
                "Data privacy protection",
                "Booking history",
                "Fraud prevention"
              ]}
            />
            <RadioGroup
              name="privacy_policy"
              label="Do you have an existing privacy policy and terms of service?"
              options={["Yes", "No", "Need assistance"]}
            />
            <RadioGroup
              name="support_channels"
              label="How should customers contact support?"
              options={[
                "WhatsApp",
                "Phone calls",
                "Email",
                "Website contact form",
                "Multiple channels"
              ]}
            />
            <Textarea
              name="support_details"
              label="Any special customer support requirements?"
            />
          </Section>

          {/* SECTION 14 */}
          <Section
            number="14"
            title="Project Budget & Timeline"
            description="Let's discuss your expectations for the project."
          >
            <Select
              name="project_budget"
              label="What is your estimated budget for the website?"
              required
              options={[
                "Below ₦150,000",
                "₦150,000 – ₦250,000",
                "₦250,000 – ₦350,000",
                "₦350,000 – ₦500,000",
                "₦500,000 – ₦750,000",
                "Above ₦750,000",
                "To be discussed"
              ]}
            />
            <Input
              name="launch_date"
              label="When would you like the website to launch?"
              type="date"
            />
            <Select
              name="project_priority"
              label="What is your highest priority?"
              options={[
                "Launch as soon as possible",
                "Quality and functionality",
                "Working alongside the mobile app",
                "Gradual development in phases",
                "Not decided"
              ]}
            />
            <Textarea
              name="project_expectations"
              label="What would make this project successful for you?"
              required
            />
            <Textarea
              name="additional_features"
              label="Are there any other features or ideas we have not covered?"
              placeholder="Include anything else you want us to consider."
            />
          </Section>

          {/* SECTION 15 */}
          <Section
            number="15"
            title="Final Confirmation"
            description="Please confirm the information before submitting your project brief."
          >
            <Input
              name="contact_person"
              label="Full name of the person completing this questionnaire"
              required
            />
            <Input
              name="contact_role"
              label="Position or role in the company"
              placeholder="Founder, Director, Manager, etc."
              required
            />
            <Input
              name="contact_email"
              label="Your email address"
              type="email"
              required
            />
            <Input
              name="contact_phone"
              label="Your preferred contact number"
              required
            />
            <RadioGroup
              name="decision_authority"
              label="Are you authorized to approve the website project?"
              options={[
                "Yes, I am the decision-maker",
                "I will discuss with the management",
                "I am completing this on behalf of the company"
              ]}
              required
            />

            <div className="agreement-box">
              <label className="agreement-option">
                <input type="checkbox" name="information_confirmation" value="Confirmed" required />
                <span>
                  I confirm that the information provided in this questionnaire
                  is accurate and reflects our current project requirements.
                  <b className="required"> *</b>
                </span>
              </label>

              <label className="agreement-option">
                <input type="checkbox" name="development_confirmation" value="Acknowledged" required />
                <span>
                  I understand that this questionnaire is for project discovery
                  and that development will begin after the requirements have
                  been reviewed and the project scope, pricing and terms have
                  been agreed upon.
                  <b className="required"> *</b>
                </span>
              </label>
            </div>
          </Section>

          {error && (
            <div className="error-message" role="alert">
              {error}
            </div>
          )}

          <div className="submit-area">
            <div className="submit-copy">
              <span className="eyebrow">FINAL STEP</span>
              <h2>Ready to get started?</h2>
              <p>
                Review your answers carefully. Once submitted, your project
                information will be sent to RAY DIGITAL for review.
              </p>
            </div>

            <button
              className="submit-button"
              type="submit"
              disabled={submitting}
            >
              {submitting ? "SUBMITTING..." : "SUBMIT PROJECT QUESTIONNAIRE"}
              <span>↗</span>
            </button>

            <p className="privacy-note">
              Your submitted information will be used to assess and plan
              your website project.
            </p>
          </div>
        </form>
      </main>

      <footer className="footer">
        <div className="footer-brand">
          RAY <span>DIGITAL</span>
        </div>
        <p>MODERN DIGITAL EXPERIENCES. BUILT WITH PURPOSE.</p>
        <span className="footer-line"></span>
        <small>© {new Date().getFullYear()} RAY DIGITAL. ALL RIGHTS RESERVED.</small>
      </footer>
    </div>
  );
}

export default App;