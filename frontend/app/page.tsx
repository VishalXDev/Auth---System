// app/page.tsx
"use client";
import Link from "next/link";
import {
  Phone,
  User,
  Shield,
  ArrowRight,
  Smartphone,
  Lock,
  Zap,
  CheckCircle,
  Star,
} from "lucide-react";
import { useEffect } from "react";

export default function Home() {
  // ✅ useEffect goes here (top level)
  useEffect(() => {
    console.log("🌐 Frontend running on http://localhost:3000");
    console.log("⚡ Next.js + Tailwind + API ready");
    console.log("📱 Login with phone → receive OTP → verify");
  }, []);

  // ✅ features array stays separate
  const features = [
    {
      icon: Shield,
      title: "Secure Authentication",
      description:
        "Military-grade encryption with quantum-resistant algorithms protecting your digital identity",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Sub-second verification with our neural network-powered authentication engine",
    },
    {
      icon: Lock,
      title: "Privacy First",
      description:
        "Zero-knowledge architecture ensures your data remains completely anonymous",
    },
  ];


  return (
    <div className="min-h-screen bg-white text-black">
      {/* Hero Section */}
      <div className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-8">
            {/* Simple Icon */}
            <div className="flex justify-center">
              <div className="p-4 bg-gray-100 rounded-full">
                <Smartphone className="w-8 h-8 text-gray-700" />
              </div>
            </div>

            {/* Clean Headline */}
            <h1 className="text-5xl font-bold space-y-2">
              <div className="text-gray-800">Next-Gen</div>
              <div className="text-black">Authentication</div>
            </h1>

            {/* Simple Subtitle */}
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience secure, fast authentication with our AI-powered system.
              <br />
              <span className="text-gray-500">Join thousands of developers who trust our platform.</span>
            </p>

            {/* Clean CTA Buttons */}
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/login" className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                <Phone className="w-4 h-4" />
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link href="/profile" className="inline-flex items-center gap-2 border border-gray-300 text-black px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                <User className="w-4 h-4" />
                <span>View Dashboard</span>
              </Link>
            </div>

            {/* Simple Status Badge */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">System Online</span>
              </div>

              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm text-gray-600">99.9% Uptime</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-gray-600">0.3s Response</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-black mb-4">Why Choose Our Platform</h2>
            <p className="text-gray-600 text-lg">Built with modern security principles and user experience in mind</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                {/* Icon */}
                <div className="mb-6">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-gray-700" />
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-black mb-3">{feature.title}</h3>

                <p className="text-gray-600 mb-4 leading-relaxed">{feature.description}</p>

                <div className="flex items-center gap-2 text-sm text-gray-500 hover:text-black cursor-pointer transition-colors">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How it Works */}
      <div className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-black mb-4">How It Works</h2>
            <p className="text-gray-600 text-lg">Three simple steps to secure authentication</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Enter Your Phone",
                description: "Provide your phone number for secure verification",
                icon: Phone,
              },
              {
                step: "02",
                title: "Receive OTP",
                description: "Get a secure one-time password sent to your device",
                icon: Shield,
              },
              {
                step: "03",
                title: "Access Granted",
                description: "Enter the code and gain instant secure access",
                icon: CheckCircle,
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                {/* Step Number */}
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-300">{step.step}</span>
                </div>

                {/* Icon */}
                <div className="mb-6 flex justify-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                    <step.icon className="w-8 h-8 text-gray-700" />
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-black mb-3">{step.title}</h3>

                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-20 px-4 bg-gray-50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-black mb-4">Ready to Get Started?</h2>

          <p className="text-gray-600 text-lg mb-8">Join over 100,000+ developers who trust our authentication system.</p>

          <Link href="/login" className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition-colors text-lg">
            <Phone className="w-5 h-5" />
            <span>Start Authentication</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Clean Footer */}
      <footer className="py-12 px-4 border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-xl font-bold text-black mb-2">VishalXDev</h3>
              <p className="text-gray-600">Modern authentication solutions</p>
            </div>

            {/* Links */}
            <div className="space-y-2">
              <Link href="/" className="block text-gray-600 hover:text-black transition-colors">Home</Link>
              <Link href="/login" className="block text-gray-600 hover:text-black transition-colors">Login</Link>
              <Link href="/profile" className="block text-gray-600 hover:text-black transition-colors">Profile</Link>
            </div>

            {/* Social */}
            <div className="flex gap-4">
              {[
                { icon: "github", href: "https://github.com/VishalXDev" },
                { icon: "twitter", href: "https://twitter.com/" },
                { icon: "linkedin", href: "https://linkedin.com/in/" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:text-black hover:bg-gray-200 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    {social.icon === 'github' && (
                      <path fillRule="evenodd" d="M12 2C6.475 2 2 6.486 2 12.021c0 4.424 2.867 8.166 6.84 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.704-2.782.605-3.37-1.34-3.37-1.34-.454-1.154-1.11-1.462-1.11-1.462-.907-.62.07-.608.07-.608 1.003.07 1.53 1.03 1.53 1.03.892 1.531 2.341 1.089 2.91.833.092-.647.35-1.089.636-1.339-2.22-.253-4.555-1.112-4.555-4.947 0-1.092.39-1.987 1.03-2.686-.103-.253-.446-1.273.098-2.654 0 0 .84-.27 2.75 1.026A9.554 9.554 0 0112 6.844c.85.004 1.705.115 2.504.338 1.91-1.296 2.749-1.026 2.749-1.026.545 1.381.202 2.401.1 2.654.64.699 1.028 1.594 1.028 2.686 0 3.844-2.339 4.69-4.566 4.938.36.31.678.921.678 1.856 0 1.338-.012 2.418-.012 2.747 0 .267.18.578.688.48C19.136 20.184 22 16.443 22 12.021 22 6.486 17.523 2 12 2z" clipRule="evenodd" />
                    )}
                    {social.icon === 'twitter' && (
                      <path d="M22.46 6c-.77.35-1.6.59-2.46.7a4.3 4.3 0 001.88-2.38 8.59 8.59 0 01-2.72 1.04 4.28 4.28 0 00-7.29 3.9A12.13 12.13 0 013 4.8a4.28 4.28 0 001.32 5.7c-.65-.02-1.27-.2-1.8-.5v.05a4.28 4.28 0 003.44 4.2 4.3 4.3 0 01-1.93.07 4.28 4.28 0 004 2.97 8.58 8.58 0 01-5.33 1.83c-.34 0-.68-.02-1.02-.06a12.1 12.1 0 006.56 1.92c7.88 0 12.18-6.53 12.18-12.18 0-.19 0-.37-.01-.55a8.7 8.7 0 002.14-2.22z" />
                    )}
                    {social.icon === 'linkedin' && (
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    )}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div className="pt-8 border-t border-gray-200 text-center">
            <p className="text-gray-500">© 2025 VishalXDev. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}