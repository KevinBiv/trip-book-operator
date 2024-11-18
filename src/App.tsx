import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Schedule from "./pages/schedule";
import RoutesDashboard from "./pages/routes";

// function HomePage() {
//   return (
//     <>
//       <div className="h-[500px] bg-gradient-to-br from-primary-800 to-primary-900 relative">
//         <Header />
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
//           <div className="text-center text-white">
//             <h1 className="text-4xl font-bold mb-4">Book Your Bus Journey</h1>
//             <p className="text-xl text-primary-100">Travel comfortably with the largest bus booking platform</p>
//           </div>
//         </div>
//       </div>

//       <SearchForm />
//       <PopularRoutes />
//       <Features />
//       <TicketDemo />

//       <footer className="bg-gray-900 text-white py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             <div>
//               <h3 className="text-lg font-semibold mb-4">About TripBook</h3>
//               <ul className="space-y-2">
//                 <li><Link to="/operator" className="text-gray-400 hover:text-white">Operator Dashboard</Link></li>
//                 <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
//                 <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold mb-4">Services</h3>
//               <ul className="space-y-2">
//                 <li><a href="#" className="text-gray-400 hover:text-white">Bus Tickets</a></li>
//                 <li><a href="#" className="text-gray-400 hover:text-white">Package Deals</a></li>
//                 <li><a href="#" className="text-gray-400 hover:text-white">Gift Cards</a></li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold mb-4">Help</h3>
//               <ul className="space-y-2">
//                 <li><a href="#" className="text-gray-400 hover:text-white">FAQs</a></li>
//                 <li><a href="#" className="text-gray-400 hover:text-white">Support</a></li>
//                 <li><a href="#" className="text-gray-400 hover:text-white">Terms</a></li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold mb-4">Connect</h3>
//               <ul className="space-y-2">
//                 <li><a href="#" className="text-gray-400 hover:text-white">Facebook</a></li>
//                 <li><a href="#" className="text-gray-400 hover:text-white">Twitter</a></li>
//                 <li><a href="#" className="text-gray-400 hover:text-white">Instagram</a></li>
//               </ul>
//             </div>
//           </div>
//           <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
//             <p>&copy; 2024 TripBook. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </>
//   );
// }

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/routes" element={<RoutesDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
