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
            <div className="space-y-6">
              
              <div className="flex items-center space-x-3 pb-4 border-b border-slate-800">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  <Compass className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{ACADEMY_INFO.name}</h3>
                  <p className="text-xs text-slate-400">Irving Campus & Digital Learning Hub</p>
                </div>
              </div>

              {/* Address detail */}
              <div className="space-y-4 text-sm text-slate-200">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-white block font-semibold">Physical Address:</strong>
                    <p className="text-slate-300">{ACADEMY_INFO.locationFull}</p>
                    <p className="text-xs text-slate-400 mt-0.5">(Minutes from Las Colinas, Coppell & Highway 183 / MacArthur)</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Globe className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-white block font-semibold">Service Coverage Area:</strong>
                    <p className="text-slate-300">{ACADEMY_INFO.regionArea}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-white block font-semibold">Direct Phone Lines:</strong>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-slate-300 font-medium mt-0.5">
                      <a href={`tel:${ACADEMY_INFO.primaryPhone}`} className="hover:text-amber-300 transition-colors">
                        Primary: {ACADEMY_INFO.primaryPhone}
                      </a>
                      <a href={`tel:${ACADEMY_INFO.secondaryPhone}`} className="hover:text-amber-300 transition-colors">
                        Secondary: {ACADEMY_INFO.secondaryPhone}
                      </a>
                    </div>
                  </div>
                </div>

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

          {/* Right Simulated Interactive Map Card */}
          <div className="lg:col-span-6 bg-slate-100 rounded-3xl p-6 sm:p-8 border border-slate-200 flex flex-col justify-between relative min-h-[380px]">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-800 bg-blue-100 px-3 py-1 rounded-full uppercase tracking-wider">
                  Interactive Irving Map View
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  MacArthur Blvd Corridor
                </span>
              </div>

              {/* Map Illustration Graphic */}
              <div className="bg-slate-900 text-white rounded-2xl p-6 h-64 flex flex-col items-center justify-center relative overflow-hidden shadow-inner border border-slate-700">
                {/* Grid Overlay background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-40" />

                <div className="relative z-10 text-center space-y-3">
                  <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center animate-bounce">
                    <MapPin className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-white">1200 N MacArthur Blvd</h4>
                    <p className="text-xs text-amber-300 font-medium">Suite 210, Irving, TX 75061</p>
                  </div>
                  <span className="inline-block text-[11px] bg-slate-800 px-3 py-1 rounded-full text-slate-300 font-mono">
                    32.8398° N, 96.9592° W
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href="https://maps.google.com/?q=1200+N+MacArthur+Blvd+Irving+TX+75061"
                target="_blank"
                rel="noreferrer"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm transition-colors flex items-center justify-center shadow"
              >
                <Navigation className="w-4 h-4 mr-2" />
                Open Google Maps Directions
                <ExternalLink className="w-3.5 h-3.5 ml-1.5 opacity-70" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
