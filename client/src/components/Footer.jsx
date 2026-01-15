import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Top Section */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Dropbox</h4>
            <ul className="space-y-2 text-gray-600">
              <li><a href="#" className="hover:text-blue-600">Desktop app</a></li>
              <li><a href="#" className="hover:text-blue-600">Mobile app</a></li>
              <li><a href="#" className="hover:text-blue-600">Integrations</a></li>
              <li><a href="#" className="hover:text-blue-600">Features</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Products</h4>
            <ul className="space-y-2 text-gray-600">
              <li><a href="#" className="hover:text-blue-600">Plus</a></li>
              <li><a href="#" className="hover:text-blue-600">Professional</a></li>
              <li><a href="#" className="hover:text-blue-600">Business</a></li>
              <li><a href="#" className="hover:text-blue-600">Enterprise</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Support</h4>
            <ul className="space-y-2 text-gray-600">
              <li><a href="#" className="hover:text-blue-600">Help center</a></li>
              <li><a href="#" className="hover:text-blue-600">Contact us</a></li>
              <li><a href="#" className="hover:text-blue-600">Community</a></li>
              <li><a href="#" className="hover:text-blue-600">Cookies</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Company</h4>
            <ul className="space-y-2 text-gray-600">
              <li><a href="#" className="hover:text-blue-600">About us</a></li>
              <li><a href="#" className="hover:text-blue-600">Careers</a></li>
              <li><a href="#" className="hover:text-blue-600">News</a></li>
              <li><a href="#" className="hover:text-blue-600">Investors</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Legal</h4>
            <ul className="space-y-2 text-gray-600">
              <li><a href="#" className="hover:text-blue-600">Privacy</a></li>
              <li><a href="#" className="hover:text-blue-600">Terms</a></li>
              <li><a href="#" className="hover:text-blue-600">Security</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8 border-gray-300" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Dropbox Clone. All rights reserved.</p>

          <div className="flex space-x-4 mt-4 sm:mt-0">
            <a href="#" className="hover:text-blue-600"><FaFacebookF /></a>
            <a href="#" className="hover:text-blue-600"><FaTwitter /></a>
            <a href="#" className="hover:text-blue-600"><FaLinkedinIn /></a>
            <a href="#" className="hover:text-blue-600"><FaInstagram /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


