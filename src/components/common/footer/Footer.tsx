import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full h-[6.25rem] bg-gray-10">
      <div className="max-w-[60.25rem] h-full mx-auto flex items-center text-body-1-regular text-gray-50">
        <p>&copy; codeit - 2025</p>
        <ul className="flex grow justify-center gap-[1.875rem] ">
          <li>Privacy Policy</li>
          <li>FAQ</li>
        </ul>
        <ul className="flex gap-2.5">
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
