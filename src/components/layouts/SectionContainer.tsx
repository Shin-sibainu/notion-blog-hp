const SectionContainer = ({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title?: string;
  description?: string;
}) => {
  return (
    <section className="py-10 sm:py-20 max-w-5xl mx-auto">
      <div className="text-center space-y-4">
        <h3 className="text-2xl md:text-4xl font-bold">{title}</h3>

        <div className="text-sm sm:text-base max-w-xl mx-auto">
          <span className="text-gray-600">{description}</span>
        </div>
      </div>

      <div>{children}</div>
    </section>
  );
};

export default SectionContainer;
