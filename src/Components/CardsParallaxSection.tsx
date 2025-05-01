import  { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const BoxContent = [
  {
    nav: "Opening",
    title: "Opening Hours",
    subtitle:
      "Monday to Friday: 10:00 AM - 6:00 PM | Saturday & Sunday: 9:00 AM - 7:00 PM",
    imgUrl:
      "https://www.maykenbel.com/wp-content/uploads/2018/05/Leighton-House-Museum.jpg",
  },
  {
    nav: "Tickets",
    title: "Ticket Prices",
    subtitle:
      "Adults: $20 | Students: $15 | Children under 12: Free | Seniors: $18",
    imgUrl:
      "https://cdn.shopify.com/s/files/1/1395/5787/files/blog_The-leighton-house-museum.jpg?15464174877386876953",
  },
  {
    nav: "Location",
    title: "Location",
    subtitle:
      "123 Museum Ave, London, UK | Easily accessible by public transport",
    imgUrl:
      "https://www.rbkc.gov.uk/museums/sites/museums/files/styles/default_header_image_desktop/public/2021-08/THENAR~1.JPG?itok=nN_5I1W8",
  },
  {
    nav: "Services",
    title: "Visitor Services",
    subtitle:
      "Free Wi-Fi, Audio Guides, Gift Shop, and Café available for all visitors",
    imgUrl:
      "https://i2.wp.com/www.featurefloors.co.uk/wp-content/uploads/2017/11/Leighton-house-arab-hall.jpg?resize=980%2C551&ssl=1",
  },
];

const CardsParallaxSection = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-43%"]);

  const [activeTab, setActiveTab] = useState(0);

  return (
    <div ref={ref} className="bg-white w-screen h-[300vh] relative">
      <div className="sticky top-0 flex flex-col justify-center h-[100vh] bg-white">
        <div className="h-[65vh] overflow-hidden mx-[3%] mb-10">
          <motion.div style={{ x }} className="w-[300vw] h-[65vh] flex gap-5">
            {BoxContent.map((item, index) => (
              <CardBox
                key={index}
                title={item.title}
                subtitle={item.subtitle}
                imgUrl={item.imgUrl}
                onInView={() => setActiveTab(index)}
              />
            ))}
          </motion.div>
        </div>
        <SlideTabs activeTab={activeTab} />
      </div>
    </div>
  );
};

export default CardsParallaxSection;

const CardBox = ({
  title,
  subtitle,
  imgUrl,
  onInView,
}: {
  title: string;
  subtitle: string;
  imgUrl: string;
  onInView?: () => void;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    amount: "all",
  });

  useEffect(() => {
    if (isInView && onInView) {
      onInView();
    }
  }, [isInView]);

  return (
    <div ref={ref} className="relative w-[50vw] h-full rounded-3xl">
      <img src={imgUrl} className="w-full h-full rounded-2xl object-cover" />
      <div className="absolute inset-0 bg-black/40 rounded-2xl"></div>
      <div className="absolute bottom-5 text-white text-2xl flex flex-col gap-1 px-[5%] font-semibold z-10">
        <h1>{title}</h1>
        <h1 className="text-xl font-semibold">{subtitle}</h1>
      </div>
    </div>
  );
};

const SlideTabs = ({ activeTab }: { activeTab: number }) => {
  const [position, setPosition] = useState({
    left: 10,
    width: 30,
    opacity: 1,
  });

  const tabRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const currentTab = tabRefs.current[activeTab];
    if (currentTab) {
      const { width } = currentTab.getBoundingClientRect();
      setPosition({
        width,
        opacity: 1,
        left: currentTab.offsetLeft,
      });
    }
  }, [activeTab]);

  return (
    <ul className="relative flex items-center justify-evenly w-100 h-14 border border-black rounded-full mx-auto">
      {BoxContent.map((item, key) => (
        <li
          ref={(el) => {
            tabRefs.current[key] = el;
          }}
          key={key}
          className="relative z-10 px-4 text-white mix-blend-difference cursor-default"
        >
          {item.nav}
        </li>
      ))}
      <Cursor position={position} />
    </ul>
  );
};

const Cursor = ({
  position,
}: {
  position: { left: number; width: number; opacity: number };
}) => {
  return (
    <motion.li
      animate={position}
      className="absolute z-0 h-12 rounded-full bg-black left-0"
    ></motion.li>
  );
};
