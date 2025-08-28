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
  CheckCircle
} from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: Shield,
      title: "Secure Authentication",
      description: "OTP-based phone verification ensures your account stays protected",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Get verified in seconds with our streamlined authentication flow",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Lock,
      title: "Privacy First",
      description: "Your phone number is encrypted and stored securely",
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-48 h-48 sm:w-72 sm:h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-48 h-48 sm:w-72 sm:h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
          <div className="absolute -bottom-8 left-20 w-48 h-48 sm:w-72 sm:h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-12 sm:pb-16">
          <div className="text-center">
            {/* Main Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6 sm:mb-8 shadow-2xl">
              <Smartphone className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" />
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Secure Phone
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                {" "}Authentication
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-600 mb-8 sm:mb-12 max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto leading-relaxed px-4">
              Experience seamless, secure login with our modern OTP-based authentication system.
              Get started in seconds with just your phone number.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-12 sm:mb-16 px-4">
              <Link
                href="/login"
                className="group inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl sm:rounded-2xl hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-500/25 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 w-full sm:w-auto"
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Get Started
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>

              <Link
                href="/profile"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl sm:rounded-2xl hover:border-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-500/25 transition-all duration-200 w-full sm:w-auto"
              >
                <User className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                View Profile
              </Link>
            </div>

            {/* Status Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-3 sm:px-4 py-2 shadow-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs sm:text-sm font-medium text-gray-700">System Online</span>
              <div className="text-xs sm:text-sm text-gray-500 hidden sm:block">•</div>

              {/* Local Backend */}
              <span className="text-xs sm:text-sm text-gray-600 hidden sm:block">
                Local:{" "}
                <code className="bg-gray-100 px-2 py-0.5 rounded text-xs">
                  {process.env.NEXT_PUBLIC_API_URL_LOCAL}
                </code>
              </span>

              {/* Production Backend */}
              <span className="text-xs sm:text-sm text-gray-600 hidden sm:block">
                Production:{" "}
                <code className="bg-gray-100 px-2 py-0.5 rounded text-xs">
                  {process.env.NEXT_PUBLIC_API_URL}
                </code>
              </span>
            </div>




          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 sm:py-16 lg:py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              Why Choose Our Authentication?
            </h2>
            <p className="text-base sm:text-lg xl:text-xl text-gray-600 max-w-xl lg:max-w-2xl mx-auto">
              Built with modern security practices and user experience in mind
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-r ${feature.color} rounded-xl sm:rounded-2xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                </div>

                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                  {feature.title}
                </h3>

                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover effect decoration */}
                <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-bl from-gray-50 to-transparent rounded-bl-2xl sm:rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How it Works Section */}
      <div className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              How It Works
            </h2>
            <p className="text-base sm:text-lg xl:text-xl text-gray-600 max-w-xl lg:max-w-2xl mx-auto">
              Simple, secure, and fast - get authenticated in three easy steps
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-8 lg:gap-12 relative">
            {/* Connection lines for desktop */}
            <div className="hidden lg:block absolute top-8 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform -translate-y-1/2"></div>

            {[
              {
                step: "01",
                title: "Enter Phone",
                description: "Provide your phone number in E.164 format",
                icon: Phone
              },
              {
                step: "02",
                title: "Verify OTP",
                description: "Enter the 6-digit code sent to your phone",
                icon: Shield
              },
              {
                step: "03",
                title: "Access Profile",
                description: "You're authenticated and ready to go!",
                icon: CheckCircle
              }
            ].map((step, index) => (
              <div key={index} className="relative text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 sm:mb-6 shadow-lg">
                  <step.icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                </div>

                <div className="absolute -top-2 -right-2 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-white border-3 sm:border-4 border-blue-500 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-xs sm:text-sm font-bold text-blue-500">{step.step}</span>
                </div>

                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                  {step.title}
                </h3>

                <p className="text-sm sm:text-base text-gray-600 max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 sm:mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-blue-100 mb-6 sm:mb-8 max-w-xl lg:max-w-2xl mx-auto">
            Join thousands of users who trust our secure authentication system
          </p>

          <Link
            href="/login"
            className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 font-semibold rounded-xl sm:rounded-2xl hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-white/25 transition-all duration-200 shadow-xl transform hover:scale-105"
          >
            <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Start Authentication
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
          </Link>
        </div>
      </div>
      {/* Footer */}
      <div className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center text-center sm:text-left">
            {/* Left: Brand */}
            <div>
              <h3 className="text-lg font-bold text-gray-900">VishalXDev</h3>
              <p className="text-sm text-gray-500 mt-1">
                Built with ❤️ by <span className="font-semibold">VishalXDev</span>
              </p>
            </div>

            {/* Middle: Quick Links */}
            <div className="flex flex-col sm:flex-row justify-center sm:justify-center gap-3 sm:gap-6 text-sm text-gray-600">
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Home
              </Link>
              <Link href="/login" className="hover:text-blue-600 transition-colors">
                Login
              </Link>
              <Link href="/profile" className="hover:text-blue-600 transition-colors">
                Profile
              </Link>
            </div>

            {/* Right: Social Links */}
            <div className="flex justify-center sm:justify-end space-x-4">
              <a
                href="https://github.com/VishalXDev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.475 2 2 6.486 2 12.021c0 4.424 2.867 8.166 6.84 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.704-2.782.605-3.37-1.34-3.37-1.34-.454-1.154-1.11-1.462-1.11-1.462-.907-.62.07-.608.07-.608 1.003.07 1.53 1.03 1.53 1.03.892 1.531 2.341 1.089 2.91.833.092-.647.35-1.089.636-1.339-2.22-.253-4.555-1.112-4.555-4.947 0-1.092.39-1.987 1.03-2.686-.103-.253-.446-1.273.098-2.654 0 0 .84-.27 2.75 1.026A9.554 9.554 0 0112 6.844c.85.004 1.705.115 2.504.338 1.91-1.296 2.749-1.026 2.749-1.026.545 1.381.202 2.401.1 2.654.64.699 1.028 1.594 1.028 2.686 0 3.844-2.339 4.69-4.566 4.938.36.31.678.921.678 1.856 0 1.338-.012 2.418-.012 2.747 0 .267.18.578.688.48C19.136 20.184 22 16.443 22 12.021 22 6.486 17.523 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-400 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.59-2.46.7a4.3 4.3 0 001.88-2.38 8.59 8.59 0 01-2.72 1.04 4.28 4.28 0 00-7.29 3.9A12.13 12.13 0 013 4.8a4.28 4.28 0 001.32 5.7c-.65-.02-1.27-.2-1.8-.5v.05a4.28 4.28 0 003.44 4.2c-.31.08-.64.13-1 .13-.24 0-.47-.02-.7-.06a4.28 4.28 0 004 2.96A8.6 8.6 0 012 19.54a12.12 12.12 0 006.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.39-.01-.58A8.73 8.73 0 0022.46 6z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.762 0 5-2.24 5-5v-14c0-2.76-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.792-1.75-1.766s.784-1.766 1.75-1.766c.964 0 1.75.792 1.75 1.766s-.786 1.766-1.75 1.766zm13.5 11.268h-3v-5.604c0-3.367-4-3.113-4 0v5.604h-3v-10h3v1.354c1.396-2.586 7-2.777 7 2.476v6.17z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Bottom small text */}
          <div className="mt-6 text-center text-xs text-gray-400">
            © {new Date().getFullYear()} VishalXDev. All rights reserved.
          </div>
        </div>
      </div>

    </div>
  );
}