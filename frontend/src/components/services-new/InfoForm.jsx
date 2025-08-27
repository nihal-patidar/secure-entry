import React, { useEffect, useState, useMemo } from "react";
import { MapPinIcon, CalendarDaysIcon, ClockIcon, CurrencyDollarIcon, UserGroupIcon, QrCodeIcon } from "@heroicons/react/24/outline";
import addFiles from "../../assets/images/undraw_add-files_d04y.svg";
import FormDetails from "./FormDetails";
import { useNavigate } from "react-router-dom";

const InfoForm = ({ serviceId, service }) => {
  const [formCreated, setFormCreated] = useState(false);
  const navigate = useNavigate();

  // Fix the useEffect dependency array
  useEffect(() => {
    if (service?.form_structure) {
      setFormCreated(true);
    }
  }, [service?.form_structure]);

  // Memoize service stats with safe fallbacks
  const serviceStats = useMemo(() => ({
    validators: service?.validater_list?.length || 0,
    validScans: service?.valid_scans || 0,
    ticketValidity: service?.ticket_validity || 0,
    ticketPrice: service?.ticket_price || 0,
    serviceType: service?.service_type || 'N/A'
  }), [service]);

  const handleCreateForm = () => {
    if (!serviceId) {
      console.error('Service ID is required');
      return;
    }
    
    navigate(`/home/services/${serviceId}/build-form`);
    setFormCreated(true);
  };

  // Loading state
  if (!service) {
    return (
      <div className="w-full h-64 bg-gray-100 border border-gray-200 rounded-xl flex items-center justify-center mb-14">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading service details...</p>
        </div>
      </div>
    );
  }

  const StatCard = ({ icon: Icon, label, value, unit = '' }) => (
    <div className="text-center px-4 py-2">
      <div className="flex items-center justify-center mb-2">
        <Icon className="w-4 h-4 text-gray-500 mr-1" aria-hidden="true" />
        <p className="text-xs sm:text-sm font-semibold tracking-wider text-gray-500 uppercase">
          {label}
        </p>
      </div>
      <p className="text-secondary text-lg sm:text-xl font-semibold">
        {value} {unit}
      </p>
    </div>
  );

  return (
    <div className="w-full bg-white border border-gray-200 rounded-xl shadow-sm mx-auto mb-10">
      {/* Header Section */}
      <div className="w-full border-b border-gray-100 rounded-t-xl flex lg:flex-row flex-col">
        
        {/* Service Info Section */}
        <div className="lg:w-1/2 w-full pb-6 lg:border-r border-gray-100">
          
          {/* Service Image */}
          <div className="relative bg-gradient-to-br from-blue-400 to-blue-600 rounded-tr-xl lg:rounded-tl-xl overflow-hidden">
            <div 
              className="absolute inset-0 bg-[url('/blueback.jpg')] bg-cover bg-center opacity-20"
              aria-hidden="true"
            />
            <img
              src={service.service_image_url}
              alt={`${service.service_name} event image`}
              className="relative w-full h-48 object-contain rounded-t-xl lg:rounded-tl-xl"
              loading="lazy"
              onError={(e) => {
                e.target.src = '/placeholder-image.png'; // Fallback image
              }}
            />
          </div>

          {/* Service Details */}
          <div className="p-6">
            <h1 className="text-gray-800 text-2xl sm:text-3xl font-semibold mb-6">
              {service.service_name}
            </h1>

            {/* Date and Location Info */}
            <div className="space-y-3 mb-6">
              <div className="flex gap-2 items-start">
                <CalendarDaysIcon className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-gray-600 text-sm sm:text-base font-semibold">
                    Starting Date: <span className="font-normal text-gray-600">{service?.service_live_date}</span>
                  </p>
                </div>
              </div>
              
              <div className="flex gap-2 items-start">
                <CalendarDaysIcon className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-gray-600 text-sm sm:text-base font-semibold">
                    Closing Date: <span className="font-normal text-gray-600">{service?.service_close_date}</span>
                  </p>
                </div>
              </div>
              
              <div className="flex gap-2 items-start">
                <MapPinIcon className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <p className="text-gray-600 text-sm sm:text-base">
                  {service.service_address || 'Location not specified'}
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 divide-x divide-gray-200 bg-gray-50 rounded-lg p-4">
              <StatCard 
                icon={ClockIcon}
                label="Validity"
                value={serviceStats.ticketValidity}
                unit="Hours"
              />
              
              <StatCard 
                icon={CurrencyDollarIcon}
                label="Price"
                value={serviceStats.ticketPrice}
                unit="Rs"
              />
              
              <StatCard 
                icon={UserGroupIcon}
                label="Validators"
                value={serviceStats.validators}
              />
              
              <StatCard 
                icon={QrCodeIcon}
                label="Valid Scans"
                value={serviceStats.validScans}
              />
              
              <StatCard 
                icon={CalendarDaysIcon}
                label="Type"
                value={serviceStats.serviceType}
              />
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="lg:w-1/2 w-full text-center py-6 px-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <QrCodeIcon className="w-6 h-6 text-gray-600" aria-hidden="true" />
            <h2 className="text-gray-700 text-2xl font-semibold">
              Form & QR
            </h2>
          </div>
          <hr className="mb-6" />

          {!formCreated ? (
            <div className="flex flex-col items-center justify-center py-10">
              <img 
                src={addFiles} 
                alt="No form created illustration" 
                className="w-28 mb-4"
                loading="lazy"
              />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                No Form Created
              </h3>
              <p className="text-gray-500 text-base mb-6 px-4 max-w-sm">
                Create a registration form for your event. You can edit details after it's created.
              </p>
              <button
                className="bg-secondary text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none"
                onClick={handleCreateForm}
                aria-label="Create registration form"
              >
                Create Form
              </button>
            </div>
          ) : (
            <FormDetails 
              serviceId={serviceId} 
              service={service}
              formData={service.formData}
              formUrl={service.service_url}
              formQr={service.service_qr}
              formId={service._id} 
            />
          )}
        </div>
      </div>

      {/* Description Section */}
      <div className="w-full px-6 sm:px-12 py-4 rounded-b-xl bg-white">
        <h3 className="text-secondary font-semibold mb-3 text-lg">
          About Event
        </h3>
        <p className="text-gray-700 leading-relaxed">
          {service.service_discription || 'No description available for this event.'}
        </p>   
      </div>
    </div>
  );
};

export default InfoForm;