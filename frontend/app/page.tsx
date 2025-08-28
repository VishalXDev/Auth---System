// app/page.tsx
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

export default function Home() {
  const features = [
    {
      icon: Shield,
      title: "Secure Authentication",
      description: "Military-grade encryption with quantum-resistant algorithms protecting your digital identity",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Sub-second verification with our neural network-powered authentication engine",
    },
    {
      icon: Lock,
      title: "Privacy First",
      description: "Zero-knowledge architecture ensures your data remains completely anonymous",
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white relative">
      {/* Subtle Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Hero Section */}
      <div className="relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            {/* Simple Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-8 shadow-lg">
              <Smartphone className="w-8 h-8 text-white" />
            </div>

            {/* Clean Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="block text-white">Next-Gen</span>
              <span className="block bg-gradient-to-r from-blue-400 to-indigo-600 bg-clip-text text-transparent">
                Authentication
              </span>
            </h1>

            {/* Simple Subtitle */}
            <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Experience secure, fast authentication with our AI-powered system.
              <br />
              <span className="text-sm text-slate-400">Join thousands of developers who trust our platform.</span>
            </p>

            {/* Clean CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                href="/login"
                className="group inline-flex items-center justify-center px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold text-base transition-all duration-200 shadow-lg"
              >
                <Phone className="w-4 h-4 mr-2" />
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>

              <Link
                href="/profile"
                className="group inline-flex items-center justify-center px-8 py-3 border border-slate-600 hover:border-slate-500 hover:bg-slate-800/50 rounded-xl font-semibold text-base transition-all duration-200"
              >
                <User className="w-4 h-4 mr-2" />
                <span>View Dashboard</span>
              </Link>
            </div>

            {/* Simple Status Badge */}
            <div className="inline-flex items-center space-x-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-full px-6 py-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm font-medium text-green-400">System Online</span>
              </div>

              <div className="hidden sm:flex items-center space-x-4 text-sm text-slate-400">
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3" />
                  <span>99.9% Uptime</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Zap className="w-3 h-3" />
                  <span>0.3s Response</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Why Choose Our Platform
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Built with modern security principles and user experience in mind
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 hover:border-slate-600 hover:bg-slate-800/50 transition-all duration-300"
              >
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-xl mb-6">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-xl font-semibold text-white mb-4">
                  {feature.title}
                </h3>

                <p className="text-slate-300 leading-relaxed mb-6">
                  {feature.description}
                </p>

                <div className="flex items-center text-blue-400 font-medium text-sm">
                  <span>Learn More</span>
                  <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How it Works */}
      <div className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-lg text-slate-300">
              Three simple steps to secure authentication
            </p>
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
              <div key={index} className="relative bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 hover:border-slate-600 hover:bg-slate-800/50 transition-all duration-300 text-center">
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{step.step}</span>
                </div>

                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-700 rounded-xl mb-6 mt-4">
                  <step.icon className="w-8 h-8 text-slate-300" />
                </div>

                <h3 className="text-xl font-semibold text-white mb-4">
                  {step.title}
                </h3>

                <p className="text-slate-300 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-20 relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>

          <p className="text-lg text-slate-300 mb-8">
            Join over 100,000+ developers who trust our authentication system.
          </p>

          <Link
            href="/login"
            className="group inline-flex items-center justify-center px-10 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg"
          >
            <Phone className="w-5 h-5 mr-2" />
            <span>Start Authentication</span>
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </div>

      {/* Clean Footer */}
      <footer className="relative bg-slate-900 border-t border-slate-700 py-12 mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Brand */}
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                VishalXDev
              </h3>
              <p className="text-slate-400 text-sm">
                Modern authentication solutions
              </p>
            </div>

            {/* Links */}
            <div className="flex justify-center md:justify-center space-x-8">
              <Link href="/" className="text-slate-300 hover:text-white transition-colors duration-200 text-sm font-medium">
                Home
              </Link>
              <Link href="/login" className="text-slate-300 hover:text-white transition-colors duration-200 text-sm font-medium">
                Login
              </Link>
              <Link href="/profile" className="text-slate-300 hover:text-white transition-colors duration-200 text-sm font-medium">
                Profile
              </Link>
            </div>

            {/* Social */}
            <div className="flex justify-center md:justify-end space-x-4">
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
                  className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center transition-colors duration-200 group"
                >
                  <svg className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24">
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

          <div className="text-center mt-10 pt-8 border-t border-slate-700">
            <p className="text-sm text-slate-400">
              © 2025 VishalXDev. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}