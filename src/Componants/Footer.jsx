// Footer.jsx
import { FaInstagram, FaFacebook, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    
    <footer className="bg-blue-600 text-white py-8 w-full  bottom-0">
      <div className="max-w-7xl mx-auto  px-6 grid grid-cols-2 md:grid-cols-3 gap-20 sm:gap-50">
        
        <div>
          <h2 className="font-semibold text-lg mb-3">Links</h2>
          <ul className="space-y-2">
            <li><a href="/" className="hover:underline">Jobs</a></li>
            <li><a href="/Companies" className="hover:underline">Companies</a></li>
            <li><a href="/Aboutus" className="hover:underline">About</a></li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-lg mb-3">Contact</h2>
          <p className="mb-1">+91 123-456-7990</p>
          <p className="mb-1">pixelgenix@gmail.com</p>
        </div>

        <div>
          <h2 className="font-semibold text-lg mb-3">Social Media</h2>
          <div className="flex space-x-4 text-2xl">
            <a href="#" className="hover:text-gray-300"><FaInstagram /></a>
            <a href="#" className="hover:text-gray-300"><FaFacebook /></a>
            <a href="#" className="hover:text-gray-300"><FaXTwitter /></a>
          </div>
        </div>

      </div>
    </footer>
  );
}
