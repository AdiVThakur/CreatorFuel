import React from 'react'
import Link from 'next/link'

const About = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white py-16 px-6 md:px-12">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header Section */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
            Fueling the Creator Economy
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
            Creator Fuel is a micro-patronage platform designed to help independent creators, developers, and artists get funded directly by their supporters.
          </p>
        </section>

        {/* Vision / Mission Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-3">
            <div className="text-purple-400 text-3xl font-bold">⚡ Fast</div>
            <h3 className="text-xl font-semibold">Direct Payments</h3>
            <p className="text-slate-400 text-sm">
              Instant supporters payments via Razorpay directly into creator bank accounts with zero friction.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-3">
            <div className="text-blue-400 text-3xl font-bold">🤝 Community</div>
            <h3 className="text-xl font-semibold">Micro-Patronage</h3>
            <p className="text-slate-400 text-sm">
              Fans can send small "sparks" of support along with personalized encouragement messages.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-3">
            <div className="text-emerald-400 text-3xl font-bold">🚀 Freedom</div>
            <h3 className="text-xl font-semibold">Creator First</h3>
            <p className="text-slate-400 text-sm">
              No subscription paywalls or heavy commissions. Focus entirely on building what you love.
            </p>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 space-y-6">
          <h2 className="text-2xl font-bold text-center text-slate-100">How Creator Fuel Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <div className="bg-purple-600/20 text-purple-400 w-10 h-10 rounded-full flex items-center justify-center font-bold mx-auto">
                1
              </div>
              <h4 className="font-semibold text-lg">Create Profile</h4>
              <p className="text-slate-400 text-sm">Set up your username and link your Razorpay credentials in your dashboard.</p>
            </div>

            <div className="space-y-2">
              <div className="bg-blue-600/20 text-blue-400 w-10 h-10 rounded-full flex items-center justify-center font-bold mx-auto">
                2
              </div>
              <h4 className="font-semibold text-lg">Share Your Link</h4>
              <p className="text-slate-400 text-sm">Add your personalized page link to your social bio, GitHub, or videos.</p>
            </div>

            <div className="space-y-2">
              <div className="bg-emerald-600/20 text-emerald-400 w-10 h-10 rounded-full flex items-center justify-center font-bold mx-auto">
                3
              </div>
              <h4 className="font-semibold text-lg">Get Funded</h4>
              <p className="text-slate-400 text-sm">Receive immediate contributions and messages from your biggest fans.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center space-y-6 py-6">
          <h2 className="text-3xl font-bold text-slate-100">Ready to power your passion?</h2>
          <div className="flex justify-center gap-4">
            <Link 
              href="/login" 
              className="bg-gradient-to-br from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-medium px-6 py-3 rounded-lg transition"
            >
              Start Your Page
            </Link>
          </div>
        </section>

      </div>
    </div>
  )
}

export default About


export const metadata = {
    title:"About - Creator Fuel"
}