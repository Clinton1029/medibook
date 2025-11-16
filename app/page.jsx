"use client";

import Hero from "./components/Hero";
import Services from "./components/Services";
import SpecialistsPage from "./components/SpecialistsPage"
import AboutPage from "./components/AboutPage";
import SupportPage from "./components/SupportPage";
import Dashboard from "./components/Dashboard";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <SpecialistsPage />
      <AboutPage />
      <SupportPage />
      <Dashboard />
    </main>
  );
}