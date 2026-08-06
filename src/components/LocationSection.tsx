import React from "react";
import { ACADEMY_INFO } from "../data";
import { MapPin, Phone, Clock, Mail, ExternalLink, Navigation, Compass, Globe } from "lucide-react";

export const LocationSection: React.FC = () => {
  return (
    <section id="location" className="py-16 sm:py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-800 px-3.5 py-1 rounded-full text-xs font-bold tracking-wide uppercase">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            <span>Serving Irving & DFW Metroplex</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Conveniently Located in Irving, Texas
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Visit our quiet learning facility on MacArthur Blvd or connect with our tutors live online from the comfort of home.
          </p>
        </div>

        <div className="mt-12 grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Location Card */}
          <div className="lg:col-span-6 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="lg:col-span-3" />
          
            <div className="lg:col-span-6 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-6">
              
              {/* Phone Lines */}
              <div className="flex items-start space-x-3 pb-4 border-b border-slate-800">
                <Phone className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-white block font-semibold">Direct Phone Lines:</strong>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-slate-300 font-medium mt-1.5">
                    <a href={`tel:${ACADEMY_INFO.primaryPhone}`} className="hover:text-amber-300 transition-colors">
                      {ACADEMY_INFO.primaryPhone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-white block font-semibold">Email Contact:</strong>
                  <a href={`mailto:${ACADEMY_INFO.email}`} className="text-slate-300 hover:text-amber-300 transition-colors">
                    {ACADEMY_INFO.email}
                  </a>
                </div>
              </div>

            </div>

            {/* Hours box */}
            <div className="mt-8 pt-6 border-t border-slate-800 bg-slate-800/60 rounded-2xl p-4">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center">
                <Clock className="w-4 h-4 mr-1.5" /> Hours of Operation
              </h4>
              <div className="grid sm:grid-cols-3 gap-2 text-xs">
                {ACADEMY_INFO.operatingHours.map((oh, i) => (
                  <div key={i} className="bg-slate-900/80 p-2 rounded-lg">
                    <span className="text-slate-400 block font-medium">{oh.days}</span>
                    <span className="text-white font-bold">{oh.hours}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <div className="lg:col-span-6 hidden" />
          
          <div className="lg:col-span-3" />
          </div>

        </div>

      </div>
    </section>
  );
};
