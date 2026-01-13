import { Phone, Mail, Facebook } from "lucide-react";
import { motion } from "framer-motion";
import LogoWord from "../atoms/LogoWord.jsx";
import ListItem from "../atoms/ListItem.jsx";
import SecHeading from "../atoms/SecHeading.jsx";
import { WhatsAppIcon, TikTokIcon } from "../atoms/Icons.jsx";

function Contact() {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="p-6 px-4 sm:px-8 mt-14 max-w-6xl mx-auto">
      <SecHeading>تواصل معنا</SecHeading>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="border border-secondary/20 rounded-2xl p-6 sm:p-10 bg-white/50 backdrop-blur-md shadow-lg flex flex-col gap-10"
      >
        {/* Contact Info Section */}
        <div className="space-y-6">
          <LogoWord font={"font-zain"} className="text-main-text text-2xl">
            معلومات التواصل
          </LogoWord>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mt-4">
            <motion.div variants={itemVariants}>
              <ListItem headTitle="واتساب" bodyTitle="+201116678912">
                <div className="text-main-text bg-green-50 rounded-full p-3">
                  <Phone size={24} className="text-green-600" />
                </div>
              </ListItem>
            </motion.div>

            <motion.div variants={itemVariants}>
              <ListItem
                headTitle="البريد الإلكتروني"
                bodyTitle="hello@norita.shop"
              >
                <div className="text-main-text bg-blue-50 rounded-full p-3">
                  <Mail size={24} className="text-blue-600" />
                </div>
              </ListItem>
            </motion.div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="space-y-8 pt-8 border-t border-secondary/10">
          <LogoWord className="text-main-text text-2xl">تابعنا على</LogoWord>

          <div className="flex justify-start gap-8 sm:gap-12 flex-wrap px-2">
            <motion.div variants={itemVariants} whileHover={{ scale: 1.1 }}>
              <ListItem type="vertical" headTitle="WhatsApp">
                <a
                  href="https://wa.me/201116678912"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#25D366] transition-colors duration-300 block"
                >
                  <WhatsAppIcon size={32} />
                </a>
              </ListItem>
            </motion.div>

            <motion.div variants={itemVariants} whileHover={{ scale: 1.1 }}>
              <ListItem type="vertical" headTitle="TikTok">
                <a
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                  className="text-black transition-colors duration-300 block"
                >
                  <TikTokIcon size={30} />
                </a>
              </ListItem>
            </motion.div>

            <motion.div variants={itemVariants} whileHover={{ scale: 1.1 }}>
              <ListItem type="vertical" headTitle="Facebook">
                <a
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#1877F2] transition-colors duration-300 block"
                >
                  <Facebook size={32} />
                </a>
              </ListItem>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Contact;
