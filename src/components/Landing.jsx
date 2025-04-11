import { GraduationCap, Briefcase, Users, Calendar, BookOpen, Award, MessageSquare, Globe, TrendingUp, MapPin, Mail, Phone } from "lucide-react";

import Navbar from './Navbar';
import NewsCards from "./NewsCards";
import { Link } from "react-router-dom";
import AlumniSection from "./AlumniSection";
export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar/>

      {/* Hero Section with Background Image */}
<section className="relative mt-16 overflow-hidden">
<div
  className="py-24 md:py-32 relative bg-cover  bg-center"
  style={{
    backgroundImage: `url('/assets/bg.jpg')`,
  }}
>
    
    {/* Background Image Layer */}
    <div
      className="absolute inset-0  bg-cover bg-center "
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d')" }}
    ></div>

    {/* Content Container */}
    <div className="max-w-6xl mx-auto px-6 relative z-10">
      <div className="md:w-2/3">
        <div className="inline-block bg-blue-700 text-white text-sm font-bold px-3 py-1 rounded-md mb-4">
          ZEAL ALUMNI NETWORK
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
          Connecting Zeal's Past with Its Future
        </h2>
        <p className="text-lg text-white mb-8 max-w-lg">
          Build lasting connections with fellow alumni, mentor current students,
          and stay engaged with Zeal College's vibrant community.
        </p>
        <div className="flex flex-wrap gap-4">
          <button
            type="button"
            className="flex items-center gap-2 bg-white text-blue-800 px-5 py-3 rounded-md hover:bg-blue-50 transition font-medium"
          >
            <GraduationCap className="h-5 w-5" />
            Why AlumniConnect
          </button>
          <Link
           to="/signup"
            className="flex items-center gap-2 border-2 border-white text-white px-5 py-3 rounded-md hover:bg-white hover:text-blue-800 transition font-medium"
          >
            <Briefcase className="h-5 w-5" />
            Register as Alumi/Student
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>


      {/* Features Section with Cards */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center mb-16">
            <span className="text-blue-700 font-semibold mb-2">POWERFUL CONNECTIONS</span>
            <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Why Join Zeal's Alumni Network</h2>
            <div className="w-20 h-1 bg-blue-700 rounded mb-4"></div>
            <p className="text-gray-600 max-w-2xl text-center">
              Our platform provides exclusive benefits and opportunities for both students and alumni of Zeal College of Engineering.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
  {/* Card 1 - Mentorship */}
  <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition group border-t-4 border-blue-500">
    <div className="p-3 bg-blue-100 rounded-lg inline-block mb-4 group-hover:bg-blue-200 transition">
      <Users className="h-8 w-8 text-blue-600" />
    </div>
    <h3 className="text-xl font-bold mb-3 text-gray-800">1-on-1 Mentorship</h3>
    <p className="text-gray-600">
      Receive personalized guidance from successful alumni in your field to shape your academic and career journey.
    </p>
    
  </div>

  {/* Card 2 - Resources */}
  <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition group border-t-4 border-blue-500">
    <div className="p-3 bg-blue-100 rounded-lg inline-block mb-4 group-hover:bg-blue-200 transition">
      <Briefcase className="h-8 w-8 text-blue-600" />
    </div>
    <h3 className="text-xl font-bold mb-3 text-gray-800">Exclusive Resources</h3>
    <p className="text-gray-600">
      Access a wealth of resources, including job boards, startup funding tips, learning material, and alumni-led workshops.
    </p>
  
  </div>

  {/* Card 3 - Live Interactions */}
  <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition group border-t-4 border-blue-500">
    <div className="p-3 bg-blue-100 rounded-lg inline-block mb-4 group-hover:bg-blue-200 transition">
      <BookOpen className="h-8 w-8 text-blue-600" />
    </div>
    <h3 className="text-xl font-bold mb-3 text-gray-800">Live Interactions</h3>
    <p className="text-gray-600">
      Attend live sessions with alumni, webinars, hackathons, and Q&A panels to stay ahead in your field.
    </p>
    
  </div>
</div>

        </div>
      </section>

      {/* Stats Section with Background */}
      <section className="py-20 px-6 relative overflow-hidden bg-gray-900 text-white">
        <div className="absolute inset-0 opacity-10 bg-[url('/api/placeholder/1920/600')] bg-cover bg-center"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <span className="text-blue-400 font-semibold mb-2 block">BY THE NUMBERS</span>
            <h2 className="text-3xl font-bold mb-4">The Growing Zeal Network</h2>
            <div className="w-20 h-1 bg-blue-400 rounded mx-auto mb-4"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm p-6 rounded-lg text-center">
              <div className="text-5xl font-bold text-blue-400 mb-2">10,000+</div>
              <p className="text-gray-300">Alumni Worldwide</p>
            </div>
            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm p-6 rounded-lg text-center">
              <div className="text-5xl font-bold text-green-400 mb-2">500+</div>
              <p className="text-gray-300">Corporate Partners</p>
            </div>
            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm p-6 rounded-lg text-center">
              <div className="text-5xl font-bold text-yellow-400 mb-2">200+</div>
              <p className="text-gray-300">Annual Events</p>
            </div>
            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm p-6 rounded-lg text-center">
              <div className="text-5xl font-bold text-purple-400 mb-2">50+</div>
              <p className="text-gray-300">Success Stories</p>
            </div>
          </div>
        </div>
      </section>
    


      <section className="bg-gray-50 py-10 px-6">
  <div className="max-w-5xl mx-auto">
    {/* Section Header */}
    <div className="text-center mb-16">
    <h2 className="text-4xl font-extrabold text-black">Zeal Alumni Connect Launch</h2>
    <p className="text-gray-700 mt-4 text-lg max-w-2xl mx-auto">
      Celebrating lifelong connections. Stay tuned for alumni stories, campus updates, and tech achievements shaping the future at Zeal.
    </p>
    <div className="w-16 h-1 mx-auto mt-6 bg-blue-600 rounded-full"></div>
  </div>
  

    {/* Main Featured News (Hero-style) */}
    <div className="mb-20">
  <div className="grid md:grid-cols-2 gap-8 items-center">
    <img
      src="https://images.unsplash.com/photo-1537539305875-d15d17683401?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      alt="Alumni Connect"
      className="w-full h-80 object-cover rounded-xl shadow-md"
    />
    <div>
      <span className="text-sm text-blue-600 uppercase font-semibold">Announcement</span>
      <h3 className="text-3xl font-bold text-gray-800 mt-2 mb-4">
        Zeal Institute Launches Official Alumni Connect Platform
      </h3>
      <p className="text-gray-600 text-base mb-6">
        The institute proudly unveils its Alumni Connect initiative to build a strong network between past and present students. Through collaborative events, mentorship programs, and professional networking, Zeal is bridging generations to inspire future success.
      </p>
      <div className="text-sm text-gray-500 flex items-center">
        <Calendar className="w-4 h-4 mr-2" />
        April 5, 2025
      </div>
    </div>
  </div>
</div>


    {/* Vertical List of News */}
    <h1 className="text-4xl sm:text-5xl font-bold text-center text-black mb-3">
  Explore the Future of Technology
</h1>
<p className="text-center text-gray-800 text-lg sm:text-xl max-w-xl mx-auto mb-8">
  Get the latest headlines and trending stories from the tech world delivered fresh, fast, and with style.
</p>

   
      <NewsCards/>
    
  </div>
</section>





      {/* Success Stories with Testimonial Cards */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center mb-16">
            <span className="text-blue-700 font-semibold mb-2">SUCCESS STORIES</span>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Alumni Achievements</h2>
            <div className="w-20 h-1 bg-blue-700 rounded mb-4"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="relative bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition">
  {/* Alumni Profile Image */}
  <div className="absolute -top-6 left-6 h-14 w-14 rounded-full overflow-hidden border-2 border-blue-500 shadow-md">
    <img
      src="https://plus.unsplash.com/premium_photo-1664910500054-608d23c060f8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // replace with actual path
      alt="Priya Sharma"
      className="h-full w-full object-cover"
    />
  </div>

  <div className="mt-8 pl-2">
    <h3 className="text-xl font-bold text-gray-800">Dnyananda Ramtirthkar</h3>
    <p className="text-blue-700 font-medium mb-2">Software Engineer at Google</p>
    
    {/* Zeal Alumni Label */}
    <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full mb-4">
      Zeal College Alumni
    </span>

    <p className="text-gray-600 mb-4">
      "The foundation I received at Zeal College equipped me with both technical skills and a growth mindset.
      The alumni network helped me connect with industry professionals who guided my career path."
    </p>

    <div className="flex text-yellow-400 mb-2">
      <Award className="h-5 w-5" />
      <Award className="h-5 w-5" />
      <Award className="h-5 w-5" />
      <Award className="h-5 w-5" />
      <Award className="h-5 w-5" />
    </div>

    <div className="text-sm text-gray-500">
      <span>Batch of 2020</span>
      <span className="mx-2">•</span>
      <span>Computer Engineering</span>
    </div>
  </div>
</div>

            
            {/* Testimonial 2 */}
            <div className="bg-gradient-to-br from-blue-700 to-indigo-800 rounded-xl shadow-md p-6 text-white hover:shadow-lg transition">
            <div className="flex justify-between items-start mb-6">
              {/* Alumni Profile Image */}
              <div className="h-16 w-16 rounded-full overflow-hidden border-4 border-blue-400 shadow-md">
                <img
                  src="https://plus.unsplash.com/premium_photo-1722682239201-21c8173e776b?q=80&w=2043&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"  // Replace with actual path
                  alt="Rahul Desai"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="text-indigo-300 text-4xl font-serif leading-none">"</div>
            </div>
          
            <h3 className="text-xl font-bold">Rahul Desai</h3>
            <p className="text-blue-200 font-medium mb-2">Founder & CEO, TechVantage</p>
          
            {/* Zeal Alumni Label */}
            <span className="inline-block bg-white/10 text-white text-xs font-semibold px-2 py-1 rounded-full mb-4">
              Zeal College Alumni
            </span>
          
            <p className="text-blue-100 mb-4">
              "My entrepreneurial journey began in the innovation labs at Zeal. The mentorship from alumni
              entrepreneurs was instrumental in helping me transform my idea into a successful startup now valued at $10M."
            </p>
          
            <div className="mt-4 text-sm text-blue-200">
              <span>Batch of 2018</span>
              <span className="mx-2">•</span>
              <span>Electronics Engineering</span>
            </div>
          </div>
          
            
            
            {/* Testimonial 3 */}
          
<div className="relative bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition">
  {/* Alumni Profile Image */}
  <div className="absolute -top-6 left-6 h-14 w-14 rounded-full overflow-hidden border-2 border-blue-500 shadow-md">
    <img
      src="https://plus.unsplash.com/premium_photo-1723568666044-1b066e26b1fb?q=80&w=1921&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // replace with actual path
      alt="Priya joshi"
      className="h-full w-full object-cover"
    />
  </div>

  <div className="mt-8 pl-2">
    <h3 className="text-xl font-bold text-gray-800">Priya Joshi</h3>
    <p className="text-blue-700 font-medium mb-2">Manager Of Newton's Technologies</p>
    
    {/* Zeal Alumni Label */}
    <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full mb-4">
      Zeal College Alumni
    </span>

    <p className="text-gray-600 mb-4">
      "The foundation I received at Zeal College equipped me with both technical skills and a growth mindset.
      The alumni network helped me connect with industry professionals who guided my career path."
    </p>

    <div className="flex text-yellow-400 mb-2">
      <Award className="h-5 w-5" />
      <Award className="h-5 w-5" />
      <Award className="h-5 w-5" />
      <Award className="h-5 w-5" />
      <Award className="h-5 w-5" />
    </div>

    <div className="text-sm text-gray-500">
      <span>Batch of 2020</span>
      <span className="mx-2">•</span>
      <span>Computer Engineering</span>
    </div>
  </div>
</div>
          </div>
        
        </div>
      </section>

      {/* Events Section */}
     <AlumniSection/>

      {/* CTA Section with background */}
      <section className="py-20 px-6 relative overflow-hidden bg-gradient-to-r from-blue-700 to-indigo-800 text-white">
        <div className="absolute inset-0 opacity-10 bg-[url('/api/placeholder/1920/600')] bg-cover bg-center"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join the Zeal College Alumni Network Today</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Whether you're a student looking for guidance or an alumnus ready to give back,
            Alumni Connect is your platform to make meaningful connections.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/signup" className="bg-white text-blue-700 px-8 py-3 rounded-md font-medium hover:bg-blue-50 transition">
              Register Now
            </Link>
            <button className="border-2 border-white text-white px-8 py-3 rounded-md font-medium hover:bg-white hover:text-blue-700 transition">
              Learn More
            </button>
          </div>
        </div>
      </section>

    
      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Alumni Connect</h3>
              <p className="mb-4">Zeal College of Engineering & Research, Pune</p>
              <div className="flex space-x-4">
                <button className="text-gray-300 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </button>
                <button className="text-gray-300 hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                  </svg>
                </button>
                <button className="text-gray-300 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </button>
                <button className="text-gray-300 hover:text-white">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </button>
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Events</a></li>
                <li><a href="#" className="hover:text-white">Career Opportunities</a></li>
                <li><a href="#" className="hover:text-white">Mentorship Program</a></li>
                <li><a href="#" className="hover:text-white">Donate</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Alumni Directory</a></li>
                <li><a href="#" className="hover:text-white">Career Services</a></li>
                <li><a href="#" className="hover:text-white">Newsletter</a></li>
                <li><a href="#" className="hover:text-white">Photo Gallery</a></li>
                <li><a href="#" className="hover:text-white">Success Stories</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Contact Us</h4>
              <address className="not-italic">
                <p className="mb-2">Zeal College of Engineering & Research</p>
                <p className="mb-2">Narhe, Pune - 411041</p>
                <p className="mb-2">Maharashtra, India</p>
                <p className="mb-2">Phone: +91 20 2169 6577</p>
                <p className="mb-2">Email: alumni@zealcoe.edu</p>
              </address>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p>&copy; 2025 Zeal College Alumni Connect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
