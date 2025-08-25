import React, { useState } from 'react'
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

function Dashboard() {
    const [service_count] = useState(24);
    const [validator_count] = useState(12);
    const [user_count] = useState(156);

    const data = [
        { name: 'Jan', services: 4000, users: 2400, validators: 2400 },
        { name: 'Feb', services: 3000, users: 1398, validators: 2210 },
        { name: 'Mar', services: 2000, users: 9800, validators: 2290 },
        { name: 'Apr', services: 2780, users: 3908, validators: 2000 },
        { name: 'May', services: 1890, users: 4800, validators: 2181 },
        { name: 'Jun', services: 2390, users: 3800, validators: 2500 },
        { name: 'Jul', services: 3490, users: 4300, validators: 2100 },
        { name: 'Aug', services: 3490, users: 4300, validators: 2100 },
        { name: 'Sep', services: 3490, users: 4300, validators: 2100 },
        { name: 'Oct', services: 3490, users: 4300, validators: 2100 },
        { name: 'Nov', services: 3490, users: 4300, validators: 2100 },
        { name: 'Dec', services: 3490, users: 4300, validators: 2100 },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex justify-start items-start px-12 py-4">
            {/* Scrollable container */}
            <div className="bg-white rounded-3xl shadow-xl w-full max-w-[1400px] ml-4 p-8 space-y-8 overflow-y-auto max-h-screen">

                {/* Header */}
                <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-[#2C3ED3]">DASHBOARD</h1>
                            <p className="text-gray-600 mt-2 text-sm">Welcome back! Here's what's happening today.</p>
                        </div>
                        <div className="hidden md:flex items-center">
                            <div className="w-12 h-12 bg-[#2C3ED3] rounded-full flex items-center justify-center shadow">
                                <BsFillBellFill className="text-white text-xl" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { title: 'Services', icon: <BsFillArchiveFill />, count: service_count },
                        { title: 'Validators', icon: <BsFillGrid3X3GapFill />, count: validator_count },
                        { title: 'Users', icon: <BsPeopleFill />, count: user_count },
                        { title: 'Alerts', icon: <BsFillBellFill />, count: 42 }
                    ].map((card, idx) => (
                        <div key={idx} className="group cursor-pointer">
                            <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 flex items-center justify-between min-h-[100px]">
                                <div className="w-14 h-14 bg-[#2C3ED3] rounded-xl flex items-center justify-center shadow group-hover:scale-105 transition-transform duration-200">
                                    {React.cloneElement(card.icon, { className: 'text-white text-2xl' })}
                                </div>
                                <div className="text-right ml-4">
                                    <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">{card.title}</p>
                                    <h3 className="text-2xl font-bold text-gray-800 mt-1">{card.count}</h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Bar Chart */}
                    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                            Monthly Analytics
                        </h3>
                        <p className="text-gray-500 text-sm mb-3">Services and user growth over time</p>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data} margin={{ top: 15, right: 20, left: 10, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                    <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} />
                                    <YAxis tick={{ fill: '#64748b', fontSize: 12 }} />
                                    <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: '12px', fontSize: '12px' }} />
                                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                                    <Bar dataKey="services" fill="url(#purpleGradient)" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="users" fill="url(#blueGradient)" radius={[4, 4, 0, 0]} />
                                    <defs>
                                        <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#8b5cf6" />
                                            <stop offset="100%" stopColor="#a855f7" />
                                        </linearGradient>
                                        <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#3b82f6" />
                                            <stop offset="100%" stopColor="#6366f1" />
                                        </linearGradient>
                                    </defs>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Line Chart */}
                    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-2">
                            Trend Analysis
                        </h3>
                        <p className="text-gray-500 text-sm mb-3">Performance trends and validator metrics</p>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={data} margin={{ top: 15, right: 20, left: 10, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                    <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} />
                                    <YAxis tick={{ fill: '#64748b', fontSize: 12 }} />
                                    <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: '12px', fontSize: '12px' }} />
                                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                                    <Line type="monotone" dataKey="services" stroke="#8b5cf6" strokeWidth={3} />
                                    <Line type="monotone" dataKey="validators" stroke="#3b82f6" strokeWidth={3} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Footer Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {[
                        { label: 'System Uptime', value: '98.5%', color: 'purple-600', bg: 'purple-50/40' },
                        { label: 'Avg Response Time', value: '2.4s', color: 'indigo-600', bg: 'indigo-50/40' },
                        { label: 'Data Accuracy', value: '99.9%', color: 'blue-600', bg: 'blue-50/40' }
                    ].map((stat, idx) => (
                        <div key={idx} className={`p-4 rounded-xl hover:bg-${stat.bg} transition-all duration-200 bg-white shadow min-h-[100px]`}>
                            <h4 className={`text-xl font-bold text-${stat.color}`}>{stat.value}</h4>
                            <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Dashboard
