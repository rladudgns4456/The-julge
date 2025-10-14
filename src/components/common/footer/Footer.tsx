import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full h-[100px] mobile:h-[126px] bg-gray-10">
      <div className="tablet:px-8 mobile:px-5 mobile:pt-8 mobile:pb-4 mobile:flex-wrap mobile:content-between max-w-[60.25rem] h-full mx-auto  flex items-center text-body-1-regular text-gray-50">
        <p className="mobile:w-full mobile:order-3 mobile:text-caption">&copy; codeit - 2025</p>
        <ul className="flex grow justify-center gap-[1.875rem] mobile:order-1 mobile:justify-start mobile:text-body-2-regular">
          <li>Privacy Policy</li>
          <li>FAQ</li>
        </ul>
        <ul className="flex gap-2.5 mobile:order-2">
          <li>
            <Link href="mailto:thejulge@example.com">
              <Image src="/email.svg" width={25} height={25} alt="이메일 아이콘" />
            </Link>
          </li>
          <li>
            <Link href="https://www.facebook.com/">
              <Image src="/facebook.svg" width={25} height={25} alt="페이스북 아이콘" />
            </Link>
          </li>
          <li>
            <Link href="https://www.instagram.com">
              <Image src="/instagram.svg" width={25} height={25} alt="인스타그램 아이콘" />
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
