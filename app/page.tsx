import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LOCALE_COOKIE, normalizeLocale } from "@/libs/i18n/config";

export default async function Home() {
  const cookieStore = await cookies();
  const locale = normalizeLocale(cookieStore.get(LOCALE_COOKIE)?.value);

  redirect(`/${locale}/home`);
}
