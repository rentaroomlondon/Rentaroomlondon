'use client';
import { useState } from 'react';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import { toast } from 'react-toastify';

export default function MaintenanceForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    priority: 'Routine',
    description: '',
    issueStarted: '',
    firstName: 'James',
    lastName: 'Carter',
    email: 'james@email.com',
    phone: '07700 900 000',
    address: 'Room A, Rosemary Court, Fortune Green Road, NW6',
    contactTime: 'Anytime',
    access: 'Yes — someone is always home',
    photos: []
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  // Helper to get labels based on step
  const stepLabels = ["Select Problem", "Add Details", "Confirm & Submit"];

  // ✅ SUBMIT API
  const submitMaintenance = async () => {
    try {
      setLoading(true);

      const cleanedPhotos = (formData.photos || []).map((p) =>
        typeof p === "string" ? p : p.url
      );

      const payload = {
        ...formData,
        photos: cleanedPhotos,
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/maintenance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to submit request");
      }

      toast.success("Maintenance request submitted successfully");

      // reset form
      setFormData({
        category: '',
        priority: '',
        description: '',
        issueStarted: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        contactTime: '',
        access: '',
        photos: []
      });

      setStep(1);

    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:px-15 md:py-5 max-w-[1440px] mx-auto">
      {/* Emergency Header */}
      <div className="bg-[#FF6B350F] border border-[#FF6B3526] p-5 rounded-lg mb-8 md:text-sm text-[12px] font-sans text-[#0F253B]">
        <p className='text-[#6B7280]'>🚨 <strong>Emergency?</strong> If you smell gas, call National Grid on <strong>0800 111 999</strong>. For fire, call <strong>999</strong>. For other emergencies: <span className="text-orange-600 font-bold">020 4570 3191</span></p>
      </div>

      {/* Progress Bar Container */}
      <div className="relative md:mb-8 pb-4 md:pb-8 md:border-b border-gray-200">
        
        {/* --- DESKTOP VIEW (Visible on md and up) --- */}
        <div className="hidden md:block">
          <div className="absolute top-4 left-0 right-0 h-[2px] bg-gray-200"></div>
          <div
            className="absolute top-4 left-0 h-[2px] bg-[#18B26A] transition-all duration-300"
            style={{ width: step === 1 ? "0%" : step === 2 ? "50%" : "100%" }}
          ></div>

          <div className="relative flex justify-between items-center">
            {/* STEP 1 */}
            <div className="flex items-center gap-3 bg-white pr-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${step >= 1 ? "bg-[#18B26A]" : "bg-gray-200"}`}>1</div>
              <span className={`font-semibold text-sm ${step >= 1 ? "text-[#18B26A]" : "text-gray-400"}`}>Select Problem</span>
            </div>

            {/* STEP 2 */}
            <div className="flex items-center gap-3 bg-white px-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${step === 2 ? "bg-[#F27438]" : step > 2 ? "bg-[#18B26A]" : "bg-gray-200"}`}>2</div>
              <span className={`font-semibold text-sm ${step === 2 ? "text-[#F27438]" : step > 2 ? "text-[#18B26A]" : "text-gray-400"}`}>Add Details</span>
            </div>

            {/* STEP 3 */}
            <div className="flex items-center gap-3 bg-white pl-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${step === 3 ? "bg-[#F27438]" : "bg-gray-200"}`}>3</div>
              <span className={`font-semibold text-sm ${step === 3 ? "text-[#F27438]" : "text-gray-400"}`}>Confirm & Submit</span>
            </div>
          </div>
        </div>

        {/* --- MOBILE VIEW (Visible on small screens) --- */}
        <div className="md:hidden flex flex-col items-start w-full">
          <div className="flex items-center w-full relative h-8 mb-4">
             {/* Background Line */}
             <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gray-200 -translate-y-1/2"></div>
             {/* Progress Line */}
             <div 
                className="absolute top-1/2 left-0 h-[2px] bg-[#18B26A] -translate-y-1/2 transition-all duration-300"
                style={{ width: step === 1 ? "0%" : step === 2 ? "50%" : "100%" }}
             ></div>
             
             {/* Circles */}
             <div className="relative flex justify-between w-full">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold z-10 ${
                      step === s
                        ? "bg-[#F27438] text-white"       // current step
                        : step > s
                        ? "bg-[#18B26A] text-white"       // completed step
                        : "bg-[#E5E7EB] text-gray-500"    // upcoming step
                    }`}
                  >
                    {s}
                  </div>
                ))}
              </div>
          </div>
          <h2 className="text-[#0F253B] font-bold text-lg">
            Step {step}/3 — {stepLabels[step - 1]}
          </h2>
        </div>
      </div>

      {/* Form Content */}
      <main>
        {step === 1 && <StepOne formData={formData} setFormData={setFormData} onNext={nextStep} />}
        {step === 2 && <StepTwo formData={formData} setFormData={setFormData} onNext={nextStep} onBack={prevStep} />}
        {step === 3 && <StepThree formData={formData} setFormData={setFormData} onBack={prevStep} onSubmit={submitMaintenance} loading={loading}/>}
      </main>
    </div>
  );
}