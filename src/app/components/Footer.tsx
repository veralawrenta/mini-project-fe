import { Facebook, Instagram, Twitter } from "lucide-react";


const Footer = () => {
  const currentYear = new Date().getFullYear();

  const primaryLinks = [
    { name: 'About Us', href: '/' },
    { name: 'Contact', href: '/contact' },
    { name: 'Blog', href: '#' },
    { name: 'Careers', href: '#' },
  ];

  const legalLinks = [
    { name: 'Terms of Service', href: '#' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Cookie Policy', href: '#' },
  ];

  return (
    <footer className="border-t pt-8 pb-6 md:pt-12 md:pb-8 mt-16">
      <div className="max-w-6xl container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2 md:col-span-1">
            <h3 className="container mx-auto text-xl font-bold tracking-tight mb-2">
              Vibe<span className='text-primary'>Pulse</span>
            </h3>
            <p className="text-sm">
            Find and book tickets for any event, anytime!
            </p>
          </div>

          <div className='container mx-auto'>
            <h4 className="text-sm font-semibold tracking-wider uppercase mb-3">
              Company
            </h4>
            <ul className="space-y-2">
              {primaryLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm hover:underline"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className='container mx-auto'>
            <h4 className="text-sm font-semibold tracking-wider uppercase mb-3">
              Support
            </h4>
            <ul className="space-y-2">
              <li key="FAQ">
                <a href="#" className="text-sm hover:underline">
                  FAQ
                </a>
              </li>
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm hover:underline"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className='container mx-auto px-4'>
            <h4 className="text-sm font-semibold tracking-wider uppercase mb-3">
              Connect
            </h4>
            <div className="flex space-x-4">

              <a href="#" className="text-lg hover:opacity-75" aria-label="Facebook">
              <Facebook />
              </a>
              <a href="#" className="text-lg hover:opacity-75" aria-label="Twitter">
                <Twitter />
              </a>
              <a href="#" className="text-lg hover:opacity-75" aria-label="Instagram">
                <Instagram />
              </a>
            </div>
          </div>
        </div>
        <div className="container mx-auto pt-6 text-center">
          <p className="text-xs">
            &copy; {currentYear} VibePulse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;