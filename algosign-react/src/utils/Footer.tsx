interface FooterProps {
  name: string;
  subtitle?: string;
  links: {
    name: string;
    href: string;
  }[];
}

const Footer = (props: FooterProps) => {
  return (
    <footer className="bg-cyan-500 text-white dark:text-white py-12 px-2 mt-10">
      <div className="flex flex-col md:grid grid-rows-3 md:grid-rows-1 md:grid-cols-2 gap-4 mx-[10%]">
        {/* Footer Name */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-bold">{props.name}</h1>
          <div className="my-4">{props.subtitle}</div>
        </div>

        {/* Footer Links */}
        <ul className="flex gap-4 justify-center md:justify-end">
          {props.links.map((link, index) => (
            <li key={index}>
              <a href={link.href} className="">
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Copyright */}
      <p className="my-4 text-center text-white">
        &#169; {props.name}. All rights reserved
      </p>
    </footer>
  );
};
export default Footer;
