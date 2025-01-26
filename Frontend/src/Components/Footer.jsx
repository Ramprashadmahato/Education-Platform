import { FaFacebook, FaTwitter, FaLinkedin, FaPython, FaNodeJs, FaReact } from "react-icons/fa";
import { SiDjango, SiHtml5, SiCss3, SiJavascript } from "react-icons/si";

function Footer() {
  return (
    <>
      <footer className="bg-gray-700 text-white p-8">
        <div className="container mx-auto">
          <div className="flex flex-wrap text-center justify-between">
            {/* Logo and About Section */}
            <div className="w-full md:w-1/3 mb-6">
              <h3 className="text-xl font-bold mb-3">Sipilay Institute</h3>
              <p className="text-sm">
                Empowering students with cutting-edge IT skills and preparing them for global opportunities. Your success is our priority.
              </p>
            </div>

            {/* Courses Links */}
            <div className="w-full md:w-1/3 mb-6 flex flex-col items-center">
              <h4 className="text-lg font-semibold mb-3 text-center">Courses</h4>
              <ul className="list-none space-y-3">
                <li className="flex items-center space-x-2">
                  <FaNodeJs />
                  <span>Full Stack Development</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FaReact />
                  <span>MEAN Stack Development</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FaPython />
                  <SiDjango />
                  <span>Python with Django</span>
                </li>
                <li className="flex items-center space-x-2">
                  <SiHtml5 />
                  <SiCss3 />
                  <SiJavascript />
                  <span>Web Development</span>
                </li>
              </ul>
            </div>

            {/* Contact Section */}
            <div className="w-full md:w-1/3 mb-6">
              <h4 className="text-lg font-semibold mb-3">Contact Us</h4>
              <p className="text-sm">
                Email: <span>info@sipilayinstitute.com</span>
              </p>
              <p className="text-sm">
                Phone: <span>+123-456-7890</span>
              </p>
              <p className="text-sm">Address: Kathmandu, Balkumari</p>
              {/*} Social Media Icons */}
              <div className="flex justify-center space-x-4 mt-5">
                <a href="https://facebook.com/sipilayinstitute" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300">
                  <FaFacebook size={20} />
                </a>
                <a href="https://twitter.com/sipilayinstitute" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300">
                  <FaTwitter size={20} />
                </a>
                <a href="https://linkedin.com/company/sipilayinstitute" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300">
                  <FaLinkedin size={20} />
                </a>
                </div>
              
            </div>
          </div>

          <hr className="my-4 border-gray-500" />

          {/* Footer Bottom */}
          <p className="text-sm text-center">
            &copy; {new Date().getFullYear()} Sipilay Institute. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
