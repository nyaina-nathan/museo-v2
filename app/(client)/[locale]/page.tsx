import { redirect } from "next/navigation";

interface LocaleIndexPageProps {
  params: Promise<{ locale: string }>;
}

export default async function LocaleIndexPage({
  params,
}: LocaleIndexPageProps) {
  const { locale } = await params;

  redirect(`/${locale}/home`);
}
