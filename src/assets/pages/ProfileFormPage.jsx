import React, { useState } from "react";
import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// A small CSS rule to visually indicate required fields
const requiredFieldLabel = {
  content: '"*"',
  color: "red",
  marginLeft: "4px",
};

export default function ProfileFormPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    fatherHusbandName: "",
    contactNumber: "",
    alternateContactNumber: "",
    email: "", // This will be populated from the user session
    degreeQualification: [],
    specialization: "",
    registrationNumber: "",
    yearsOfExperience: "",
    clinicHospitalName: "",
    clinicHospitalAddress: "",
    pincode: "",
    workingDays: [],
    workingHours: "",
    emergencyAvailability: "No",
    servicesProvided: [],
    govtHealthSchemeTieUp: "None",
    consultationFee: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prevState) => {
      const currentValues = prevState[name];
      if (checked) {
        return {
          ...prevState,
          [name]: [...currentValues, value],
        };
      } else {
        return {
          ...prevState,
          [name]: currentValues.filter((item) => item !== value),
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");

    const {
      data: { session },
    } = await supabase.auth.getSession();
    const user = session?.user;

    if (!user) {
      setMessage("Error: No active user session found. Please log in again.");
      setSubmitting(false);
      return;
    }

    // Get the Supabase ID from the authenticated user object
    const supabaseId = user.id;

    const backendApiUrl = `https://ai-doctor-assistant-backend-ai-ml.onrender.com/api/doctor-profile`;

    try {
      const requestData = {
        ...formData,
        email: user.email,
        // Pass the Supabase ID to your backend
        supabaseId: supabaseId,
        contactNumber: formData.contactNumber
          ? Number(formData.contactNumber)
          : null,
        alternateContactNumber: formData.alternateContactNumber
          ? Number(formData.alternateContactNumber)
          : null,
        yearsOfExperience: formData.yearsOfExperience
          ? Number(formData.yearsOfExperience)
          : null,
        pincode: formData.pincode ? Number(formData.pincode) : null,
        consultationFee: formData.consultationFee
          ? Number(formData.consultationFee)
          : null,
      };

      const response = await axios.post(backendApiUrl, requestData);

      if (response.status === 201) {
        const { error: updateError } = await supabase
          .from("profiles")
          .update({ is_profile_complete: "true" })
          .eq("email", user.email);

        if (updateError) {
          throw updateError;
        }

        localStorage.setItem("userEmail", user.email);
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message || "Failed to create profile.");
      } else if (error.message) {
        setMessage(`Failed to update profile status: ${error.message}`);
      } else {
        setMessage("An unexpected error occurred. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const degrees = [
    "MBBS",
    "BDS",
    "BAMS",
    "BHMS",
    "BUMS",
    "BNYS",
    "MD",
    "MS",
    "DM",
    "MCh",
    "GNM",
    "ANM",
  ];
  const workingDaysList = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const servicesList = [
    "General Consultation / OPD",
    "Emergency Care (First Aid, Trauma, Basic Treatment)",
    "Maternal Care (Antenatal & Postnatal Checkups)",
    "Child Health / Pediatrics",
    "Immunization / Vaccination",
    "Family Planning & Counseling",
    "Normal Delivery (Non-surgical)",
    "Minor Surgeries / Procedures (e.g., sutures, dressing, abscess drainage)",
    "Diagnostic Services (Lab tests, X-ray, Ultrasound if available)",
    "Pharmacy / Medicines Dispensing",
    "Chronic Disease Management (Diabetes, Hypertension, Asthma, etc.)",
    "Ayush / Alternative Medicine (Ayurveda, Homeopathy, Unani, Yoga, Naturopathy)",
  ];

  const specializations = [
    "General Physician",
    "Pediatrician",
    "Gynecologist / Obstetrician (Women’s Health)",
    "Cardiologist",
    "Neurologist",
    "Orthopedic Doctor",
    "Dermatologist",
    "Psychiatrist",
    "Ophthalmologist",
    "ENT Specialist",
    "Gastroenterologist",
    "Pulmonologist",
    "Nephrologist",
    "Endocrinologist",
    "Oncologist",
    "Urologist",
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl border border-gray-100">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Complete Your Profile
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please provide your details to access the dashboard.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Personal Information Section */}
          <div className="rounded-md shadow-sm space-y-4">
            <h3 className="text-xl font-bold text-gray-800">
              Personal & Contact Info
            </h3>
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 after:content-['*'] after:text-red-500 after:ml-1"
              >
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={formData.fullName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label
                htmlFor="fatherHusbandName"
                className="block text-sm font-medium text-gray-700"
              >
                Father's / Husband's Name
              </label>
              <input
                id="fatherHusbandName"
                name="fatherHusbandName"
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={formData.fatherHusbandName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label
                htmlFor="contactNumber"
                className="block text-sm font-medium text-gray-700 after:content-['*'] after:text-red-500 after:ml-1"
              >
                Contact Number
              </label>
              <input
                id="contactNumber"
                name="contactNumber"
                type="tel" // Using 'tel' for better mobile keyboard experience
                pattern="[0-9]*" // Restrict to numbers
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={formData.contactNumber}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label
                htmlFor="alternateContactNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Alternate Contact Number (Optional)
              </label>
              <input
                id="alternateContactNumber"
                name="alternateContactNumber"
                type="tel"
                pattern="[0-9]*"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={formData.alternateContactNumber}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Professional Information Section */}
          <div className="rounded-md shadow-sm space-y-4 pt-6 border-t border-gray-200">
            <h3 className="text-xl font-bold text-gray-800">
              Professional Details
            </h3>
            <div>
              <label
                htmlFor="degreeQualification"
                className="block text-sm font-medium text-gray-700 after:content-['*'] after:text-red-500 after:ml-1"
              >
                Degree / Qualification
              </label>
              <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
                {degrees.map((degree) => (
                  <div key={degree} className="flex items-center">
                    <input
                      id={`degree-${degree}`}
                      name="degreeQualification"
                      type="checkbox"
                      value={degree}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      onChange={handleCheckboxChange}
                      required={formData.degreeQualification.length === 0} // HTML validation
                    />
                    <label
                      htmlFor={`degree-${degree}`}
                      className="ml-2 text-sm text-gray-700"
                    >
                      {degree}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label
                htmlFor="specialization"
                className="block text-sm font-medium text-gray-700 after:content-['*'] after:text-red-500 after:ml-1"
              >
                Specialization
              </label>
              <select
                id="specialization"
                name="specialization"
                required
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={formData.specialization}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  Select a specialization
                </option>
                {specializations.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="registrationNumber"
                className="block text-sm font-medium text-gray-700 after:content-['*'] after:text-red-500 after:ml-1"
              >
                Registration Number
              </label>
              <input
                id="registrationNumber"
                name="registrationNumber"
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={formData.registrationNumber}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label
                htmlFor="yearsOfExperience"
                className="block text-sm font-medium text-gray-700"
              >
                Years of Experience
              </label>
              <input
                id="yearsOfExperience"
                name="yearsOfExperience"
                type="number"
                min="0"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={formData.yearsOfExperience}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Clinic Information Section */}
          <div className="rounded-md shadow-sm space-y-4 pt-6 border-t border-gray-200">
            <h3 className="text-xl font-bold text-gray-800">Clinic & Hours</h3>
            <div>
              <label
                htmlFor="clinicHospitalName"
                className="block text-sm font-medium text-gray-700 after:content-['*'] after:text-red-500 after:ml-1"
              >
                Clinic / Hospital Name
              </label>
              <input
                id="clinicHospitalName"
                name="clinicHospitalName"
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={formData.clinicHospitalName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label
                htmlFor="clinicHospitalAddress"
                className="block text-sm font-medium text-gray-700 after:content-['*'] after:text-red-500 after:ml-1"
              >
                Clinic / Hospital Address
              </label>
              <textarea
                id="clinicHospitalAddress"
                name="clinicHospitalAddress"
                rows="3"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={formData.clinicHospitalAddress}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label
                htmlFor="pincode"
                className="block text-sm font-medium text-gray-700 after:content-['*'] after:text-red-500 after:ml-1"
              >
                Pincode
              </label>
              <input
                id="pincode"
                name="pincode"
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={formData.pincode}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label
                htmlFor="workingDays"
                className="block text-sm font-medium text-gray-700"
              >
                Working Days
              </label>
              <div className="mt-2 flex flex-wrap gap-2">
                {workingDaysList.map((day) => (
                  <div key={day} className="flex items-center">
                    <input
                      id={`day-${day}`}
                      name="workingDays"
                      type="checkbox"
                      value={day}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      onChange={handleCheckboxChange}
                    />
                    <label
                      htmlFor={`day-${day}`}
                      className="ml-2 text-sm text-gray-700"
                    >
                      {day}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label
                htmlFor="workingHours"
                className="block text-sm font-medium text-gray-700"
              >
                Working Hours
              </label>
              <input
                id="workingHours"
                name="workingHours"
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="e.g., 10:00 AM – 2:00 PM, 5:00 PM – 8:00 PM"
                value={formData.workingHours}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label
                htmlFor="emergencyAvailability"
                className="block text-sm font-medium text-gray-700"
              >
                Emergency Availability
              </label>
              <select
                id="emergencyAvailability"
                name="emergencyAvailability"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={formData.emergencyAvailability}
                onChange={handleInputChange}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>

          {/* Services & Fees Section */}
          <div className="rounded-md shadow-sm space-y-4 pt-6 border-t border-gray-200">
            <h3 className="text-xl font-bold text-gray-800">Services & Fees</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Services Provided
              </label>
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {servicesList.map((service) => (
                  <div key={service} className="flex items-start">
                    <input
                      id={`service-${service}`}
                      name="servicesProvided"
                      type="checkbox"
                      value={service}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                      onChange={handleCheckboxChange}
                    />
                    <label
                      htmlFor={`service-${service}`}
                      className="ml-2 text-sm text-gray-700"
                    >
                      {service}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label
                htmlFor="govtHealthSchemeTieUp"
                className="block text-sm font-medium text-gray-700"
              >
                Govt. Health Scheme Tie-up
              </label>
              <select
                id="govtHealthSchemeTieUp"
                name="govtHealthSchemeTieUp"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={formData.govtHealthSchemeTieUp}
                onChange={handleInputChange}
              >
                <option value="Ayushman Bharat">Ayushman Bharat</option>
                <option value="State Health Card">State Health Card</option>
                <option value="None">None</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="consultationFee"
                className="block text-sm font-medium text-gray-700"
              >
                Consultation Fee
              </label>
              <input
                id="consultationFee"
                name="consultationFee"
                type="number"
                min="0"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={formData.consultationFee}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={submitting}
              className="mt-6 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all duration-300"
            >
              {submitting ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                "Save and Continue"
              )}
            </button>
          </div>
        </form>
        {message && (
          <div className="text-center text-sm font-medium text-red-600 mt-4">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
