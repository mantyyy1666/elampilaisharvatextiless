const Footer = () => {
  return (
    <footer className="bg-[#0F3D2E] text-[#FFFDF7] pt-16 pb-8 border-t-[6px] border-[#C9A44C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-3xl font-heading font-bold mb-6 text-[#C9A44C]">SHARVATEX</h3>
            <p className="text-[#F5E6C8] opacity-90 mb-6 max-w-sm font-body leading-relaxed">
              Premium saree wholesale directly from the weavers of Elampillai. Offering authentic Soft Silk, Arani Silk, and Cotton sarees at unbeatable prices.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-heading font-semibold mb-6 text-[#C9A44C]">Contact Us</h4>
            <div className="space-y-3 text-[#FFFDF7] opacity-90 font-body">
              <p>Email: contact@sharvatex.com</p>
              <p>Phone/WhatsApp: +91 99944 66665</p>
              <p>Location: Elampillai, Salem, Tamil Nadu</p>
            </div>
          </div>
          <div>
            <h4 className="text-xl font-heading font-semibold mb-6 text-[#C9A44C]">Quick Links</h4>
            <div className="flex flex-col space-y-3 font-body">
              <a href="/" className="text-[#FFFDF7] opacity-90 hover:text-[#C9A44C] hover:opacity-100 transition-colors w-fit">Home</a>
              <a href="/collections" className="text-[#FFFDF7] opacity-90 hover:text-[#C9A44C] hover:opacity-100 transition-colors w-fit">Collections</a>
              <a href="/admin" className="text-[#FFFDF7] opacity-90 hover:text-[#C9A44C] hover:opacity-100 transition-colors w-fit">Admin Login</a>
            </div>
          </div>
        </div>
        <div className="border-t border-[#FFFDF7]/20 pt-8 text-center text-sm text-[#F5E6C8] opacity-70 font-body">
          <p>&copy; {new Date().getFullYear()} Sharvatex. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
