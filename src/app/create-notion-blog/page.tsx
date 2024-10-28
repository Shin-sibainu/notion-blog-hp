"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import Image from "next/image";
import { templateData } from "@/components/Templates";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import emailjs from "@emailjs/browser";

interface FormData {
  blogName: string;
  domain: string;
  email: string;
  template: string;
  price: string;
  notionToken: string;
  notionId: string;
}

const CreateNotionBlogPage: React.FC = () => {
  const totalSteps = 4;

  const [step, setStep] = useState(1);
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    blogName: "", //ShinCode_Blog
    domain: "", //shincode-blog
    email: "", //test@gmail.com
    template: "", //Sleek Slate
    price: "",
    notionToken: "", //secret_uc7RDVzbGbIxkyStI2swlJejlAUsnQrPdEBz5hnYdfd
    notionId: "", //127ef6b3de6b408880c046925f5917c6
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [touchedFields, setTouchedFields] = useState<Set<keyof FormData>>(
    new Set()
  );

  const [isNotionDataCheckLoading, setIsNotionDataCheckLoading] =
    useState(false);
  const [sendingEmailLoading, setSendingEmailLoading] = useState(false);

  const [isOkShowModal, setIsOkShowModal] = useState(false);

  const [availableNotionTokenMessage, setAvailableNotionTokenMessage] =
    useState("");
  const [availableNotionIdMessage, setAvailableNotionIdMessage] = useState("");

  const validateField = (name: keyof FormData, value: string) => {
    let error = "";
    switch (name) {
      case "blogName":
        if (value.trim().length === 0) error = "ブログ名は必須です";
        break;
      case "domain":
        // ドメイン名の正規表現（トップレベルドメインを除く）
        const domainRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/;
        if (!domainRegex.test(value.trim())) {
          error = "有効なドメイン名を入力してください";
        }
        break;
      case "email":
        if (!/\S+@\S+\.\S+/.test(value))
          error = "有効なメールアドレスを入力してください";
        break;
      case "template":
        if (value.trim().length === 0) error = "テンプレートを選択してください";
        break;
      case "price":
        if (value.trim().length === 0) error = "価格プランを選択してください";
        break;
      case "notionToken":
        if (value.trim().length === 0) error = "NotionTokenは必須です";
        break;
      case "notionId":
        if (value.trim().length === 0) error = "NotionIdは必須です";
        break;
    }
    return error;
  };

  const validateNotionToken = async (notionToken: string) => {
    if (notionToken === "") {
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/notion/validateNotionTokenCredentials`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ notionToken }),
        }
      );

      const data = await response.json();

      if (!data.isValid) {
        return data.message; //エラー文
      } else {
        setAvailableNotionTokenMessage(data.message);
        return null; //エラーなし。
      }
    } catch (error) {
      console.error("エラー:", error);
      return "このNotionTokenは利用できません。もう一度確認してください。";
    }
  };

  const validateNotionId = async (notionToken: string, notionId: string) => {
    if (notionId === "") {
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/notion/validateNotionIdCredentials`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ notionToken, notionId }),
        }
      );

      const data = await response.json();

      if (!data.isValid) {
        return data.message; //エラー文
      } else {
        setAvailableNotionIdMessage(data.message);
        return null; //エラーなし。
      }
    } catch (error) {
      console.error("エラー:", error);
      return "このNotionTokenは利用できません。もう一度確認してください。";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setTouchedFields((prev) => new Set(prev).add(name as keyof FormData));

    // setAvailableNotionTokenMessage("");
    // setAvailableNotionIdMessage("");

    // バリデーションを即時実行
    const error = validateField(name as keyof FormData, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handlePriceChange = (value: string) => {
    setFormData((prev) => ({ ...prev, price: value }));
    setTouchedFields((prev) => new Set(prev).add("price"));

    const error = validateField("price", value);
    setErrors((prev) => ({ ...prev, price: error }));
  };

  const handleTemplateChange = (value: string) => {
    setFormData((prev) => ({ ...prev, template: value }));
    setTouchedFields((prev) => new Set(prev).add("template"));

    // テンプレート選択のバリデーションを即時実行
    const error = validateField("template", value);
    setErrors((prev) => ({ ...prev, template: error }));
  };

  const validateStep = (nextStep: number) => {
    let fieldsToValidate: (keyof FormData)[] = [];
    switch (step) {
      case 1:
        fieldsToValidate = ["blogName", "domain", "email"];
        break;
      case 2:
        fieldsToValidate = ["template"];
        break;
      case 3:
        fieldsToValidate = ["price"];
        break;
    }

    const newErrors: Partial<FormData> = {};
    fieldsToValidate.forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    setErrors(newErrors);

    // すべての必須フィールドをtouchedとしてマーク
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setTouchedFields((prev: any) => new Set([...prev, ...fieldsToValidate]));

    if (Object.keys(newErrors).length === 0) {
      setStep(nextStep);
    }
  };

  const handleConfirm = async () => {
    setAvailableNotionIdMessage("");
    setAvailableNotionTokenMessage("");

    //["blogName", "email", "template", "notionToken", "notionId"]
    const allFields = Object.keys(formData) as Array<keyof FormData>;
    const newErrors: Partial<FormData> = {};
    allFields.forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    // すべてのフィールドをtouchedとしてマーク
    setTouchedFields(new Set(allFields));

    setIsNotionDataCheckLoading(true);
    //notionTokenが有効かどうかの確認バリデーション
    const notionTokenError = await validateNotionToken(formData["notionToken"]);
    if (notionTokenError) newErrors["notionToken"] = notionTokenError;

    //notionIdが有効かどうかの確認バリデーション
    const notionIdError = await validateNotionId(
      formData["notionToken"],
      formData["notionId"]
    );
    if (notionIdError) newErrors["notionId"] = notionIdError;

    setErrors(newErrors);

    setIsNotionDataCheckLoading(false);

    if (Object.keys(newErrors).length === 0) {
      setIsOkShowModal(true);
    }
  };

  const handleFormSubmit = async () => {
    const { blogName, domain, email, template, price, notionToken, notionId } =
      formData;

    // 現在の日付を取得して整形
    const now = new Date();
    const createdAt = now.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    });

    //メール送信(resend)
    try {
      setSendingEmailLoading(true);
      // const mailResponse = await fetch(
      //   `${process.env.NEXT_PUBLIC_BASE_URL}/api/send`,
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       blogName,
      //       domain,
      //       email,
      //       template,
      //       price: getPlanName(price) + `(${price}円/月)`,
      //       notionToken,
      //       notionId,
      //       createdAt,
      //     }),
      //   }
      // );

      // if (!mailResponse.ok) {
      //   alert("お問い合わせに失敗しました。再度お確かめください。");
      //   return null;
      // }

      //EmailJsでメール送信
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (serviceId && templateId) {
        await emailjs
          .send(
            serviceId,
            templateId,
            {
              blogName,
              domain,
              email,
              template,
              price,
              notionToken,
              notionId,
              createdAt,
            },
            { publicKey: publicKey }
          )
          .then(
            () => console.log("SUCCESS!"),
            (error) => {
              console.log("FAILED...", error.text);
            }
          );
      }

      //NotionDBへ保存
      const notionDBResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/notion/db`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            blogName,
            domain,
            email,
            template,
            price,
            notionToken,
            notionId,
            createdAt, // メールにも作成日を含める
          }),
        }
      );

      if (!notionDBResponse.ok) {
        throw new Error(`HTTP error! status: ${notionDBResponse.status}`);
      }

      //成功ページへリダイレクトさせる
      router.push("/success-form-submit");
    } catch (error) {
      console.error("Sending Email Error", error);
      throw error;
    } finally {
      setSendingEmailLoading(false);
      setIsOkShowModal(false);
    }
  };

  const getPlanName = (price: string): string => {
    switch (price) {
      case "980":
        return "ライトプラン";
      case "1980":
        return "スタンダードプラン";
      case "4980":
        return "プロプラン";
      default:
        return "未選択";
    }
  };

  const nextStep = () => validateStep(Math.min(step + 1, totalSteps));
  const prevStep = () => setStep((prevStep) => Math.max(prevStep - 1, 1));

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div>
              <label
                htmlFor="blogName"
                className="block text-sm font-medium text-gray-700"
              >
                ブログ名 (後から変更可)
              </label>
              <Input
                id="blogName"
                name="blogName"
                value={formData.blogName}
                onChange={handleChange}
                placeholder="My_Blog"
                className="mt-1"
              />
              {(touchedFields.has("blogName") || errors.blogName) &&
                errors.blogName && (
                  <p className="mt-2 text-sm text-red-600">{errors.blogName}</p>
                )}
            </div>
            <div>
              <label
                htmlFor="domain"
                className="block text-sm font-medium text-gray-700"
              >
                ドメイン名
              </label>
              <Input
                id="domain"
                name="domain"
                value={formData.domain}
                onChange={handleChange}
                placeholder="sample_blog"
                className="mt-1"
              />
              {(touchedFields.has("domain") || errors.domain) &&
                errors.domain && (
                  <p className="mt-2 text-sm text-red-600">{errors.domain}</p>
                )}
            </div>
            <div className="mt-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                メールアドレス
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="mt-1"
              />
              {(touchedFields.has("email") || errors.email) && errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
          </>
        );
      case 2:
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              テンプレート
            </label>
            <p className="mt-1 text-sm text-gray-500">
              ブログのデザインテンプレートを選択してください。
            </p>
            <RadioGroup
              value={formData.template}
              onValueChange={handleTemplateChange}
              className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {templateData.map((template) => (
                <div key={template.id}>
                  <label htmlFor={template.name} className="cursor-pointer">
                    <Card
                      className={`overflow-hidden flex flex-col h-full transition-all duration-300 ${
                        formData.template === template.name
                          ? "ring-2 ring-blue-500"
                          : ""
                      }`}
                    >
                      <CardHeader className="p-0">
                        <Image
                          src={template.image}
                          alt={template.name}
                          width={400}
                          height={200}
                          className="w-full h-48 object-cover"
                        />
                      </CardHeader>
                      <CardContent className="p-4">
                        <CardTitle className="text-lg">
                          {template.name}
                        </CardTitle>
                        <CardDescription className="mt-2">
                          {template.description}
                        </CardDescription>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <div className="flex justify-between items-center group-hover:bg-blue-50 transition-colors duration-300">
                          <Link
                            href={template.href}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm font-medium text-blue-600"
                          >
                            テンプレートを見る
                          </Link>
                          <Link
                            href={template.href}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm font-medium text-blue-600"
                          >
                            <ArrowRight className="w-5 h-5 text-blue-600 transition-transform duration-300 group-hover:translate-x-1" />
                          </Link>
                        </div>
                      </CardFooter>
                    </Card>
                  </label>
                  <RadioGroupItem
                    value={template.name}
                    id={template.name}
                    className="sr-only"
                  />
                </div>
              ))}
            </RadioGroup>
            {touchedFields.has("template") && errors.template && (
              <p className="mt-2 text-sm text-red-600">{errors.template}</p>
            )}
          </div>
        );
      case 3:
        return (
          <div>
            <label className="block text-2xl font-bold text-gray-700 mb-4">
              価格プラン
            </label>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-blue-700 mb-2">
                1週間無料体験実施中！
              </h3>
              <p className="text-sm text-blue-600">
                どのプランでも1週間無料でお試しいただけます。期間中はいつでもキャンセル可能で、最初の支払いは発生しません。
              </p>
            </div>

            <RadioGroup
              value={formData.price}
              onValueChange={handlePriceChange}
              className="grid md:grid-cols-3 gap-8"
            >
              {[
                {
                  name: "ライトプラン",
                  price: 980,
                  features: [
                    "Notionデータベースでブログ管理",
                    "基本的なテンプレート",
                    "メールサポート",
                  ],
                },
                {
                  name: "スタンダードプラン",
                  price: 1980,
                  features: [
                    "ライトプランの全機能",
                    "全てのテンプレート選択可能",
                    "カスタムドメイン対応",
                    "優先メールサポート",
                  ],
                  recommended: true,
                },
                {
                  name: "プロプラン",
                  price: 4980,
                  features: [
                    "スタンダードプランの全機能",
                    "Google Analytics 対応可能",
                    "パフォーマンス分析(月1回)",
                    "個別カスタマイズ対応可能",
                  ],
                },
              ].map((plan) => (
                <div key={plan.name} className="relative">
                  {plan.recommended && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                      一番人気！
                    </div>
                  )}
                  <label htmlFor={plan.name} className="cursor-pointer">
                    <Card
                      className={`flex flex-col h-full transition-all duration-300 ${
                        formData.price === plan.price.toString()
                          ? "ring-2 ring-blue-500 shadow-lg"
                          : plan.recommended
                          ? "ring-2 ring-gray-300"
                          : ""
                      }`}
                    >
                      <CardHeader>
                        <CardTitle className="text-xl font-bold">
                          {plan.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <div className="text-2xl font-bold mb-2">
                          ¥{plan.price.toLocaleString()}
                          <span className="text-base font-normal text-gray-500">
                            /月
                          </span>
                        </div>
                        <div className="text-sm text-blue-600 font-semibold mb-4">
                          最初の1週間は無料！
                        </div>
                        <ul className="space-y-2">
                          {plan.features.map((feature, featureIndex) => (
                            <li
                              key={featureIndex}
                              className="flex items-center text-sm"
                            >
                              <span className="text-green-500 mr-2">✔</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </label>
                  <RadioGroupItem
                    value={plan.price.toString()}
                    id={plan.name}
                    className="sr-only"
                  />
                </div>
              ))}
            </RadioGroup>
            {touchedFields.has("price") && errors.price && (
              <p className="mt-2 text-sm text-red-600">{errors.price}</p>
            )}
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                ※
                表示価格は全て税込みです。1週間の無料体験後、選択したプランでのご利用となります。
              </p>
            </div>
          </div>
        );
      case 4:
        return (
          <>
            <div>
              <label
                htmlFor="notionToken"
                className="block text-sm font-medium text-gray-700"
              >
                NotionToken
              </label>
              <Input
                id="notionToken"
                name="notionToken"
                value={formData.notionToken}
                onChange={handleChange}
                placeholder="secret_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                className="mt-1"
              />
              <p className="mt-1 text-sm text-gray-500">
                あなたのNotion Integration Tokenを入力してください。詳しくは
                <Link
                  href="/how-to-get-notion-key"
                  className="text-blue-600 underline underline-offset-2"
                  target="_blank"
                  rel="noreferrer"
                >
                  こちら
                </Link>
              </p>
              {(touchedFields.has("notionToken") || errors.notionToken) &&
                errors.notionToken && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.notionToken}
                  </p>
                )}

              {availableNotionTokenMessage && (
                <p className="mt-2 text-sm text-green-600">
                  {availableNotionTokenMessage}
                </p>
              )}
            </div>
            <div className="mt-4">
              <label
                htmlFor="notionId"
                className="block text-sm font-medium text-gray-700"
              >
                NotionId
              </label>
              <Input
                id="notionId"
                name="notionId"
                value={formData.notionId}
                onChange={handleChange}
                placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                className="mt-1"
              />
              <p className="mt-1 text-sm text-gray-500">
                ブログを作成するNotion DatabaseのIDを入力してください。詳しくは
                <Link
                  href="/how-to-get-notion-key"
                  className="text-blue-600 underline underline-offset-2"
                  target="_blank"
                  rel="noreferrer"
                >
                  こちら
                </Link>
              </p>
              {(touchedFields.has("notionId") || errors.notionId) &&
                errors.notionId && (
                  <p className="mt-2 text-sm text-red-600">{errors.notionId}</p>
                )}
              {availableNotionIdMessage && (
                <p className="mt-2 text-sm text-green-600">
                  {availableNotionIdMessage}
                </p>
              )}
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="py-20 px-4 max-w-4xl mx-auto mb-20">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Notionブログ開設の申し込み</h1>
        <p className="text-gray-600">
          3ステップで完了です。下記の情報を入力し、Notionブログをメールからお受け取りください。
        </p>
      </div>
      <Progress value={(step / totalSteps) * 100} className="mb-6" />
      <form className="space-y-6">
        {renderStep()}
        <div className="flex justify-between mt-6">
          {step > 1 && (
            <Button type="button" onClick={prevStep} variant="outline">
              前へ
            </Button>
          )}
          {step < totalSteps ? (
            <Button type="button" onClick={nextStep} className="ml-auto">
              次へ
            </Button>
          ) : (
            <Button type="button" onClick={handleConfirm}>
              {isNotionDataCheckLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "確認する"
              )}
            </Button>
          )}
        </div>
        {isOkShowModal && (
          <AlertDialog open={isOkShowModal}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>確認</AlertDialogTitle>
                <AlertDialogDescription asChild>
                  <div>
                    この入力でよろしいですか？
                    <div className="mt-4">
                      <dl className="space-y-2 text-sm">
                        {[
                          { label: "ブログ名", value: formData.blogName },
                          { label: "ドメイン名", value: formData.domain },
                          { label: "メールアドレス", value: formData.email },
                          { label: "テンプレート名", value: formData.template },
                          {
                            label: "プラン",
                            value:
                              getPlanName(formData.price) +
                              `(${formData.price}円/月)`,
                          },
                          {
                            label: "NotionToken",
                            value: formData.notionToken ? "********" : "未入力",
                          },
                          {
                            label: "NotionId",
                            value: formData.notionId || "未入力",
                          },
                        ].map(({ label, value }) => (
                          <div key={label} className="flex items-center gap-4">
                            <dt className="font-medium min-w-[120px]">
                              ・{label}
                            </dt>
                            <dd>{value}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setIsOkShowModal(false)}>
                  キャンセル
                </AlertDialogCancel>
                <AlertDialogAction onClick={() => handleFormSubmit()}>
                  {sendingEmailLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "申し込む"
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </form>
    </div>
  );
};

export default CreateNotionBlogPage;

//127ef6b3de6b408880c046925f5917c6
