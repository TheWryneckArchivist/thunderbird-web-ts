"use client";
import type { JSX } from "react";

import { useI18n } from "@/app/i18n";

export function Footer(): JSX.Element {
    const { dictionary } = useI18n();
    const copy = dictionary.footer;

    return (
        <footer id="footer" className="bg-[#0A0A0A] text-gray-400 py-16 px-8 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
              
              {/* Brand Column */}
              <div className="md:col-span-1">
                <h3 className="text-white font-black uppercase tracking-tighter text-2xl mb-6 italic">
                  Thunderbird
                </h3>
                <p className="text-sm leading-relaxed text-gray-500">
                  {copy.brandDescription}
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-8 opacity-50">{copy.platform}</h3>
                <ul className="text-sm space-y-4">
                  <li><a href="#asset-showcase" className="hover:text-red-500 transition-colors">{copy.latestReleases}</a></li>
                  <li><a href="#features" className="hover:text-red-500 transition-colors">{copy.documentation}</a></li>
                  <li><a href="#asset-showcase" className="hover:text-red-500 transition-colors">{copy.assetLibrary}</a></li>
                  <li><a href="#asset-showcase" className="hover:text-red-500 transition-colors">{copy.submitPack}</a></li>
                </ul>
              </div>

              {/* Community Links */}
              <div>
                <h3 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-8 opacity-50">{copy.community}</h3>
                <ul className="text-sm space-y-4">
                  <li><a href="#" className="hover:text-red-500 transition-colors">{copy.discordServer}</a></li>
                  <li><a href="#" className="hover:text-red-500 transition-colors">{copy.githubRepository}</a></li>
                  <li><a href="#" className="hover:text-red-500 transition-colors">{copy.twitter}</a></li>
                  <li><a href="#features" className="hover:text-red-500 transition-colors">{copy.showcase}</a></li>
                </ul>
              </div>

              {/* Newsletter/Follow */}
              <div>
                <h3 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-8 opacity-50">{copy.stayConnected}</h3>
                <p className="text-sm mb-6 text-gray-500">{copy.newsletterBody}</p>
                <div className="flex gap-2">
                  <input 
                    type="email" 
                    placeholder={copy.emailAddress}
                    className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-xs focus:outline-none focus:border-red-500 w-full transition-all"
                  />
                  <button className="bg-red-600 hover:bg-red-700 text-white px-4 rounded-lg transition-all active:scale-95 shadow-lg shadow-red-900/20">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] tracking-widest uppercase font-bold text-gray-600">
              <div className="flex gap-8">
                <a href="#home" className="hover:text-white transition-colors">{copy.privacyPolicy}</a>
                <a href="#home" className="hover:text-white transition-colors">{copy.termsOfService}</a>
                <a href="#home" className="hover:text-white transition-colors">{copy.contact}</a>
              </div>
              <p>{copy.copyright}</p>
            </div>
          </div>
        </footer>
    );
}
