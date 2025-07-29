const Feature = () => {
  return (
    <>
      <div className=" gap-7 my-12  px-4 md:px-6 border-2 grid grid-cols-1 xl:grid-cols-2 font-heading py-6 rounded-xl shadow-xl">
        <div className="">
          <img
            src="https://i.ibb.co/wNX8rvBc/pexels-karolina-grabowska-4226921.jpg"
            className="aspect-video object-cover rounded-xl shadow-xl"
          />
        </div>
        <div className="">
          <h1 className="font-bold text-red-600 underline">Featured</h1>
          <h1 className=" text-primary font-bold tracking-tighter text-3xl">
            WHY A BLOOD SHORTAGE?
          </h1>
          <hr />
          <p className="mb-4">
            In developed nations like the US and Europe, there are robust
            systems in place for collecting, testing, and processing blood,
            along with active citizen involvement in blood donation initiatives.
            However, in numerous underprivileged countries, a lack of adequate
            and safe blood remains a prevalent issue. Establishing blood
            donation programs in these areas is hindered by various challenges,
            resulting in insufficient availability of safe blood.
          </p>
          <h1 className=" text-accent font-bold tracking-tighter text-2xl">
            WHY US?
          </h1>
          <hr />
          <p>
            At <span className="text-accent font-bold">LifeStream</span>, we
            are committed to making a meaningful impact through blood donation.
            Here is why you should choose us:
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mt-4">
            <div className="text-sm bg-white shadow-xl rounded-xl p-2 border-2 border-accent">
              <h1 className="font-bold">Convenience and Accessibility</h1>
              <hr />
              <p>
                We strive to make the donation process easy and accessible for
                everyone. With multiple locations, flexible scheduling, and
                friendly staff, we ensure a comfortable experience for our
                donors.
              </p>
            </div>
            <div className="text-sm bg-white shadow-xl rounded-xl p-2 border-2 border-accent">
              <h1 className="font-bold">Education and Blogs</h1>
              <hr />
              <p>
                Our team provides information and guidance throughout the
                donation process. We are here to answer your questions, address
                concerns, and offer ongoing support to our donors.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Feature;
