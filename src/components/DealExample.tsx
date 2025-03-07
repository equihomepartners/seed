import React, { useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

declare global {
  interface Window {
    L: any;
  }
}

const DealExample = () => {
  // Historical returns data
  const data = [
    { year: 2019, value: 18.13 },
    { year: 2020, value: 25.14 },
    { year: 2021, value: 19.38 },
    { year: 2022, value: 14.00 },
    { year: 2023, value: 10.13 },
    { year: 2024, value: 9.35 },
    { year: 2025, value: 8.76 },
    { year: 2026, value: 8.29 },
    { year: 2027, value: 7.91 },
    { year: 2028, value: 7.58 },
    { year: "Underwrite", value: 10.65 }
  ];

  useEffect(() => {
    // Add Leaflet CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    // Add Leaflet JS
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => {
      // Initialize map after Leaflet is loaded
      const L = window.L;
      const map = L.map('map').setView([-33.838195, 151.220197], 15);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      L.marker([-33.838195, 151.220197])
        .addTo(map)
        .bindPopup('24 Ben Boyd Road, Neutral Bay');
    };
    document.body.appendChild(script);

    // Cleanup
    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="w-full bg-white space-y-8">
      {/* Investment Thesis */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Investment Thesis:</h3>
        <ul className="space-y-2 text-gray-700">
          <li>- Neutral Bay is a suburb located on the Lower North Shore of Sydney</li>
          <li>- The property is well located with access to transport both ferry and buses</li>
          <li>- The house is small, but is well maintained and refurbished</li>
          <li>- David is single and looking to use the free additional free cashflow for investments for his retirement</li>
          <li>- The exit strategy is to move into an apartment upon retirement in the next 5 years</li>
        </ul>
        <div className="mt-4 p-4 bg-sky-50 rounded-lg">
          <p className="text-sky-800 text-sm">
            <strong>Note:</strong> While this property doesn't fully align with our premium asset criteria, it demonstrates how even lower-tier assets in our green zones can produce solid returns. The stable location and clear exit strategy help mitigate risks.
          </p>
        </div>
      </div>

      {/* Location */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
        <div className="space-y-4">
          {/* Map */}
          <div id="map" className="w-full h-[300px] bg-gray-100 rounded-lg overflow-hidden relative"></div>

          {/* Location Details */}
          <div className="bg-gradient-to-br from-sky-50 to-gray-100 rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-900">24 Ben Boyd Road</h4>
                <p className="text-gray-600 mt-1">Neutral Bay, Sydney NSW</p>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm font-medium text-gray-900 mb-2">Transport</h5>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center">
                        <span className="mr-2">•</span>
                        5 mins to ferry
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2">•</span>
                        10 mins to CBD
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-900 mb-2">Amenities</h5>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center">
                        <span className="mr-2">•</span>
                        Walking distance to shops
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2">•</span>
                        Premium Lower North Shore location
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Borrower Details */}
      <div className="bg-emerald-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">The Borrower</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="bg-white p-4 rounded-lg">
              <table className="w-full">
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="py-2 text-gray-600">Name</td>
                    <td className="py-2 text-gray-900 font-medium">David</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-600">Address</td>
                    <td className="py-2 text-gray-900 font-medium">24 Ben Boyd Road, Neutral Bay</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-600">Family Status</td>
                    <td className="py-2 text-gray-900 font-medium">Single</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-600">Gross Income</td>
                    <td className="py-2 text-gray-900 font-medium">$200,000</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-600">Use of Funds</td>
                    <td className="py-2 text-gray-900 font-medium">Lifestyle</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Deal Details */}
      <div className="bg-sky-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">The Deal</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="bg-white p-4 rounded-lg">
              <table className="w-full">
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="py-2 text-gray-600">Deal Date</td>
                    <td className="py-2 text-gray-900 font-medium">1-Jan-2020</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-600">Deal End Date</td>
                    <td className="py-2 text-gray-900 font-medium">30-Jun-2024</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-600">PropTrack AVM Value</td>
                    <td className="py-2 text-gray-900 font-medium">$2,300,000</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-600">PropTrack Low Range</td>
                    <td className="py-2 text-gray-900 font-medium">$2,180,000</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-600">Discount from the AVM</td>
                    <td className="py-2 text-gray-900 font-medium">-5.22%</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-600">1st Mortgage Debt</td>
                    <td className="py-2 text-gray-900 font-medium">$650,000</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-600">Additional Equity Released</td>
                    <td className="py-2 text-gray-900 font-medium">-</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-600">Total Debt</td>
                    <td className="py-2 text-gray-900 font-medium">$650,000</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-600">LVR</td>
                    <td className="py-2 text-gray-900 font-medium">29.82%</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-600">Simple Interest Rate</td>
                    <td className="py-2 text-gray-900 font-medium">5%</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-600">Upside Participation Rate</td>
                    <td className="py-2 text-gray-900 font-medium">29.82%</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-600">Term, Years</td>
                    <td className="py-2 text-gray-900 font-medium">4.5</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Returns Profile Chart */}
          <div className="bg-white p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Returns Profile</h4>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis 
                    dataKey="year" 
                    tick={{ fill: '#6B7280' }}
                  />
                  <YAxis 
                    tick={{ fill: '#6B7280' }}
                    domain={[0, 30]}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Return']}
                    labelFormatter={(label) => `Year: ${label}`}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#0EA5E9" 
                    strokeWidth={2}
                    dot={{ fill: '#0EA5E9', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h5 className="text-sm font-semibold text-gray-900 mb-2">Understanding the Returns Profile</h5>
              <p className="text-sm text-gray-600">
                This graph shows the Internal Rate of Return (IRR) if the investment was exited at each point in time. For example:
              </p>
              <ul className="mt-2 space-y-1 text-sm text-gray-600">
                <li>• Exit in 2020: 25.14% IRR</li>
                <li>• Exit in 2024: 9.35% IRR</li>
                <li>• Projected 2028: 7.58% IRR</li>
              </ul>
              <p className="mt-2 text-sm text-gray-600">
                The declining IRR over time reflects the mathematical impact of spreading returns over a longer period, not a decrease in absolute returns. The underwrite rate of 10.65% represents our conservative base case.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Growth Profiles */}
      <div className="bg-purple-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">The Growth Profiles</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <table className="w-full">
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-2 text-gray-600">Suburb Growth Rate</td>
                  <td className="py-2 text-gray-900 font-medium">4.65%</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-600">Forecast Growth Rate</td>
                  <td className="py-2 text-gray-900 font-medium">2.65%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Traffic Light */}
      <div className="bg-green-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Traffic Light</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <table className="w-full">
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-2 text-gray-600">Council (LGA)</td>
                  <td className="py-2 text-gray-900 font-medium">NORTH SYDNEY COUNCIL</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-600">Suburb Traffic Light</td>
                  <td className="py-2 text-green-600 font-medium">Green</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealExample; 