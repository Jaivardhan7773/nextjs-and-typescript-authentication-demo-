'use client';
import Image from "next/image";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from "./lib/store";

export default function Home() {
  const router = useRouter();

  const { user } = useAuthStore()


  useEffect(() => {
    if (!user) {
      router.replace('/auth/login'); // redirect to login if not logged in
    }
  }, [user, router]);

  if (!user) return null


  return (
    <>
      <div className="font-sans text-gray-900">

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-800 to-indigo-950 text-white py-20 px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to Your Next Big Project</h1>
          <p className="text-xl max-w-3xl mx-auto mb-8 ">Build beautiful, blazing-fast apps with modern tools and a great developer experience.</p>
          <button className="bg-white text-blue-700 rounded-lg px-6 py-3 font-semibold hover:bg-gray-100 transition cursor-pointer">Get Started</button>
        </section>

        {/* Features Section */}
        <section className="py-20 px-6 mx-5 bg-gradient-to-r from-emerald-900 to-emerald-500 rounded-lg my-5 text-amber-50">
          <h2 className="text-4xl font-bold mb-12 text-center">Features You'll Love</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-6 shadow-lg rounded-xl hover:shadow-2xl transition">
              <h3 className="text-2xl font-semibold mb-3">Fast Performance</h3>
              <p>Optimized rendering and lightning-fast build times let you focus on what matters.</p>
            </div>
            <div className="p-6 shadow-lg rounded-xl hover:shadow-2xl transition">
              <h3 className="text-2xl font-semibold mb-3">Developer Friendly</h3>
              <p>Enjoy top-tier tooling, hot reloading, and rich plugin ecosystem for productivity.</p>
            </div>
            <div className="p-6 shadow-lg rounded-xl hover:shadow-2xl transition">
              <h3 className="text-2xl font-semibold mb-3">Flexible Styling</h3>
              <p>Use Tailwind CSS to rapidly design visually stunning interfaces with utility-first classes.</p>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="bg-gradient-to-l from-violet-500 to-blue-500 py-20 px-6  mx-5 rounded-lg shadow-lg">
          <h2 className="text-4xl font-bold mb-6 text-center">About This Demo</h2>
          <p className="text-lg leading-relaxed mb-4">
            This demo landing page is built with modern React using Vite bundler and styled using Tailwind CSS. It showcases how to structure sections for a powerful frontend experience with minimal code.
          </p>
          <p className="text-lg leading-relaxed">
            Tailwind's utility-first approach allows for speedy development without sacrificing design quality. This example includes hero banners, feature highlights, about sections, testimonials, and more.
          </p>
        </section>


        <section className="py-20 px-6 max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-amber-50 mb-12 text-center">What People Are Saying</h2>
          <div className="grid gap-12 md:grid-cols-3">
            <div className="border border-gray-300 rounded-lg p-8 shadow-sm hover:shadow-lg transition">
              <p className="italic mb-4 text-amber-50">"This toolset transformed our web app development cycle and improved delivery by leaps!"</p>
              <h4 className="font-semibold text-amber-50">Alexa R.</h4>
              <span className=" text-amber-50">Frontend Developer</span>
            </div>
            <div className="border border-gray-300 rounded-lg p-8 shadow-sm hover:shadow-lg transition">
              <p className="italic mb-4 text-amber-50">"Tailwind + Vite = Perfect for rapid prototyping and scalable solutions."</p>
              <h4 className="font-semibold text-amber-50">John M.</h4>
              <span className="text-amber-50">Fullstack Engineer</span>
            </div>
            <div className="border border-gray-300 rounded-lg p-8 shadow-sm hover:shadow-lg transition">
              <p className="italic mb-4 text-amber-50">"I love the blazing fast builds and the modular CSS approach."</p>
              <h4 className="font-semibold text-amber-50">Samantha L.</h4>
              <span className="text-amber-50">Product Manager</span>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-violet-500 text-white py-20 px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to build your app?</h2>
          <button className="bg-white cursor-pointer text-blue-700 px-8 py-4 rounded-full text-xl font-semibold hover:bg-amber-100 transition-colors">Start Your Journey</button>
        </section>

        {/* Footer */}
        <footer className="bg-gray-950 text-gray-200 text-center py-1">
          <p>© 2025 Jaivardhan singh All rights reserved</p>
        </footer>
      </div>
    </>
  );
}
