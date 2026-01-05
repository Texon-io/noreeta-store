import LogoWord from "../atoms/LogoWord";

function FooterLogo() {
  return (
    <div className="logo">
      <LogoWord className="text-3xl pb-5" children="نوريتا ستور" />
      <p className="font-zain text-lg leading-relaxed">
        متجركم المفضل للكتب والأدوات المكتبية التي تلهم الإبداع.
      </p>
    </div>
  );
}

export default FooterLogo;
