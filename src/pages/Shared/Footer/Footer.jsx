import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-red-700 text-white px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and Info */}
        <div>
          <img
            className="w-16 mb-2"
            src="https://i.ibb.co.com/0y3TKf4/images-q-tbn-ANd9-Gc-QTFUPJ215o-Q9m-Bln91-MMv65-J4-IRMUi-JZXi-Dw-s.png"
            alt="Blood Bank"
          />
          <p className="text-sm">
            Saving lives one drop at a time. Join us in making a difference.
          </p>
        </div>

        {/* Navigation 1 */}
        <div>
          <h4 className="font-bold mb-2 text-white">Pages</h4>
          <ul className="space-y-1">
            <li><Link to="/searchPage" className="hover:underline">Search Donors</Link></li>
            <li><Link to="/blood-donation-request" className="hover:underline">Donation Requests</Link></li>
            <li><Link to="/blog" className="hover:underline">Blog</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-bold mb-2 text-white">Contact</h4>
          <p className="text-sm">📞 +880 1234 567890</p>
          <p className="text-sm">📧 contact@lifestream.org</p>
        </div>

        {/* Socials */}
        <div>
          <h4 className="font-bold mb-2 text-white">Follow Us</h4>
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-gray-200"><FaFacebook /></a>
            <a href="#" className="hover:text-gray-200"><FaTwitter /></a>
            <a href="#" className="hover:text-gray-200"><FaInstagram /></a>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-red-500 pt-4 text-center text-sm text-white">
        © {new Date().getFullYear()} Blood Bank. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
