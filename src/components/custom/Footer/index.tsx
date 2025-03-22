import { motion } from "framer-motion";
import Image from "next/image";
import { Mail, Phone, Instagram } from "lucide-react";
import Link from "next/link";

const Footer = ({ dictionary }: { dictionary: any }) => {
  return (
    <>
      <footer className="border-t border-stroke bg-white dark:border-strokedark dark:bg-blacksection">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          {/* <!-- Footer Top --> */}
          <div className="py-20 lg:py-25">
            <div className="flex flex-wrap gap-8 lg:justify-between lg:gap-0">
              <motion.div
                variants={{
                  hidden: {
                    opacity: 0,
                    y: -20,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                  },
                }}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
                className="animate_top w-1/2 lg:w-1/4"
              >
                <Link href="/" className="relative">
                  <Image
                    width={119.03}
                    height={30}
                    src="/images/logo/logo_background_light.png"
                    alt="Logo"
                    className="dark:hidden"
                  />
                  <Image
                    width={119.03}
                    height={30}
                    src="/images/logo/logo_background_dark.png"
                    alt="Logo"
                    className="hidden dark:block"
                  />
                </Link>

                <p className="mb-10 mt-5">{dictionary.footer.title}</p>
                <h4 className="mb-9 text-itemtitle2 font-medium text-black dark:text-white">
                  contact
                </h4>
                {/* <p className="mb-1.5 text-sectiontitle uppercase tracking-[5px]">
                  contact
                </p> */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    <Link
                      href="mailto:ohmacore@gmail.com"
                      className="text-itemtitle  text-black hover:text-primary dark:text-white"
                    >
                      ohmacore@gmail.com
                    </Link>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    <Link
                      href="tel:0784684955"
                      className="text-itemtitle  text-black hover:text-primary dark:text-white"
                    >
                      0784684955
                    </Link>
                  </div>
                </div>
              </motion.div>

              <div className="flex w-full flex-col gap-8 md:flex-row md:justify-between md:gap-0 lg:w-2/3 xl:w-7/12">
                <motion.div
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: -20,
                    },
                    visible: {
                      opacity: 1,
                      y: 0,
                    },
                  }}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 1, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="animate_top"
                >
                  <h4 className="mb-9 text-itemtitle2 font-medium text-black dark:text-white">
                    {dictionary.footer.usefulLinks.title}
                  </h4>

                  <ul>
                    {dictionary.footer.usefulLinks.links.map((link) => (
                      <li key={link.title}>
                        <Link
                          href={link.path}
                          className="mb-3 inline-block hover:text-primary"
                        >
                          {link.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: -20,
                    },
                    visible: {
                      opacity: 1,
                      y: 0,
                    },
                  }}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 1, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="animate_top"
                >
                  <h4 className="mb-9 text-itemtitle2 font-medium text-black dark:text-white">
                    {dictionary.footer.socialMedia.title}
                  </h4>

                  <ul>
                    {dictionary.footer.socialMedia.links.map((link) => (
                      <li key={link.title}>
                        <Link
                          href={link.path}
                          className="mb-3 inline-block hover:text-primary"
                        >
                          {link.title === "Instagram" && (
                            <Instagram className="mr-2 inline-block h-5 w-5" />
                          )}
                          {link.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>

          {/* <!-- Footer Bottom --> */}
          <div className="flex items-center justify-end gap-5 border-t border-stroke py-7 dark:border-strokedark lg:flex-row lg:justify-between lg:gap-0">
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  y: -20,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_top mx-auto"
            >
              <p>
                &copy; {new Date().getFullYear()} {dictionary.footer.rights}
              </p>
            </motion.div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
