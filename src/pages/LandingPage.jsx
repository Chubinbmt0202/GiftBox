import React from "react";

const LandingPage = () => {
  return (
    <div className="bg-[#EFE7DD] min-h-screen font-serif text-[#3A2E2A]">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-16 py-6">
        <div className="text-2xl font-semibold tracking-wide">
          maison<span className="text-[#7A5C45]">.</span>
        </div>

        <div className="hidden md:flex gap-10 text-sm tracking-widest uppercase">
          <a href="#" className="hover:opacity-70">Build</a>
          <a href="#" className="hover:opacity-70">Story</a>
          <a href="#" className="hover:opacity-70">Packaging</a>
          <a href="#" className="hover:opacity-70">Login</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-16 py-20">
        <div className="grid md:grid-cols-2 items-center gap-16">

          {/* LEFT TEXT */}
          <div>
            <p className="uppercase tracking-[6px] text-xs mb-6 text-[#7A5C45]">
              handcrafted with love
            </p>

            <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-8">
              build your <br /> gift box
            </h1>

            <p className="text-lg max-w-md mb-10 leading-relaxed opacity-80">
              Tự tay chọn từng món quà nhỏ xinh và tạo nên một hộp quà mang dấu
              ấn riêng của bạn. Vintage – tinh tế – đầy cảm xúc.
            </p>

            {/* Options */}
            <div className="mb-8">
              <p className="text-sm mb-3 tracking-wide uppercase">
                box type
              </p>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="box" className="accent-[#7A5C45]" />
                  Classic
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="box" className="accent-[#7A5C45]" />
                  Premium
                </label>
              </div>
            </div>

            {/* CTA */}
            <button className="bg-[#4E3B2F] text-white px-10 py-4 tracking-wider uppercase text-sm hover:bg-[#7A5C45] transition-all duration-300">
              create your box — from 149k
            </button>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative">
            <div className="bg-[#F6F1E8] rounded-[30px] p-8 shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1607082349566-187342175e2f"
                alt="Gift Box"
                className="rounded-xl object-cover"
              />
            </div>

            {/* Decorative vertical text */}
            <div className="absolute -left-10 top-10 rotate-[-90deg] text-xs tracking-[8px] opacity-30 uppercase hidden md:block">
              handmade limited custom
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="px-16">
        <div className="h-[1px] bg-[#C9B8A7] opacity-40"></div>
      </div>

      {/* Second Section */}
      <section className="px-16 py-24 grid md:grid-cols-3 gap-12 text-center">
        <div>
          <h3 className="text-xl font-semibold mb-4">Vintage Aesthetic</h3>
          <p className="text-sm opacity-70 leading-relaxed">
            Tone màu ấm, thiết kế tinh tế mang lại cảm giác hoài niệm và sang trọng.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Student Friendly</h3>
          <p className="text-sm opacity-70 leading-relaxed">
            Giá phù hợp học sinh sinh viên, dễ dàng tùy chỉnh theo ngân sách.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Personalized</h3>
          <p className="text-sm opacity-70 leading-relaxed">
            Thêm lời nhắn viết tay và chọn từng món quà theo phong cách riêng.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#4E3B2F] text-white py-24 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Ready to create something meaningful?
        </h2>
        <button className="bg-white text-[#4E3B2F] px-10 py-4 uppercase tracking-wider text-sm hover:bg-[#EFE7DD] transition-all duration-300">
          start building now
        </button>
      </section>

    </div>
  );
};

export default LandingPage;