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
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            {/* Main Icon */}
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-8 shadow-2xl">
              <Smartphone className="w-12 h-12 text-white" />
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Secure Phone
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                {" "}Authentication
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Experience seamless, secure login with our modern OTP-based authentication system. 
              Get started in seconds with just your phone number.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link
                href="/login"
                className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-2xl hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-500/25 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                <Phone className="w-5 h-5 mr-2" />
                Get Started
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>

              <Link
                href="/profile"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-2xl hover:border-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-500/25 transition-all duration-200"
              >
                <User className="w-5 h-5 mr-2" />
                View Profile
              </Link>
            </div>

            {/* Status Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-4 py-2 shadow-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">System Online</span>
              <div className="text-sm text-gray-500">•</div>
              <span className="text-sm text-gray-600">
                Backend: <code className="bg-gray-100 px-2 py-0.5 rounded text-xs">
                  {process.env.NEXT_PUBLIC_API_URL || "http://localhost:3004"}
                </code>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Authentication?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Built with modern security practices and user experience in mind
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover effect decoration */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-gray-50 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How it Works Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Simple, secure, and fast - get authenticated in three easy steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection lines for desktop */}
            <div className="hidden md:block absolute top-8 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform -translate-y-1/2"></div>

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
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6 shadow-lg">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-white border-4 border-blue-500 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-xs font-bold text-blue-500">{step.step}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust our secure authentication system
          </p>
          
          <Link
            href="/login"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-2xl hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-white/25 transition-all duration-200 shadow-xl transform hover:scale-105"
          >
            <Phone className="w-5 h-5 mr-2" />
            Start Authentication
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500">
            Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  );
}