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
import Image from "next/image";
import { templateData } from "@/components/Templates";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Client } from "@notionhq/client";

interface FormData {
  blogName: string;
  email: string;
  template: string;
  notionToken: string;
  notionId: string;
}

const CreateNotionBlogPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  const [formData, setFormData] = useState<FormData>({
    blogName: "ShinCode_Blog",
    email: "test@gmail.com",
    template: "Sleek Slate",
    notionToken: "",
    notionId: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [touchedFields, setTouchedFields] = useState<Set<keyof FormData>>(
    new Set()
  );
  const [isNotionDataCheckLoading, setIsNotionDataCheckLoading] =
    useState(false);

  const validateField = (name: keyof FormData, value: string) => {
    let error = "";
    switch (name) {
      case "blogName":
        if (value.trim().length === 0) error = "ブログ名は必須です";
        break;
      case "email":
        if (!/\S+@\S+\.\S+/.test(value))
          error = "有効なメールアドレスを入力してください";
        break;
      case "template":
        if (value.trim().length === 0) error = "テンプレートを選択してください";
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
    const notion = new Client({ auth: notionToken });

    try {
      // 実際にAPIを呼び出す
      await notion.users.list({});
      return null;
    } catch (error) {
      console.error("エラー:", error);
      return "このNotionTokenは利用できません。もう一度確認してください。";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setTouchedFields((prev) => new Set(prev).add(name as keyof FormData));

    // バリデーションを即時実行
    const error = validateField(name as keyof FormData, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
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
        fieldsToValidate = ["blogName", "email"];
        break;
      case 2:
        fieldsToValidate = ["template"];
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    //["blogName", "email", "template", "notionToken", "notionId"]
    const allFields = Object.keys(formData) as Array<keyof FormData>;
    const newErrors: Partial<FormData> = {};
    allFields.forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    //newErrors[filed] = errorでエラーの追加可能。
    setErrors(newErrors);

    //notionToken and notionIdが有効かどうかの確認バリデーション
    const error = await validateNotionToken(formData["notionToken"]);
    console.log(error);
    if (error) newErrors["notionToken"] = error;

    // すべてのフィールドをtouchedとしてマーク
    setTouchedFields(new Set(allFields));

    if (Object.keys(newErrors).length === 0) {
      const { blogName, email, template, notionToken, notionId } = formData;
      //メール送信
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/send`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              blogName,
              email,
              template,
              notionToken,
              notionId,
            }),
          }
        );
      } catch (error) {
        console.error("Sending Email Error", error);
        throw error;
      }
    } else {
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
                ブログ名
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
                      className={`overflow-hidden ${
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
                あなたのNotionアカウントのアクセストークンを入力してください。
              </p>
              {(touchedFields.has("notionToken") || errors.notionToken) &&
                errors.notionToken && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.notionToken}
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
                ブログを作成するNotionページのIDを入力してください。
              </p>
              {(touchedFields.has("notionId") || errors.notionId) &&
                errors.notionId && (
                  <p className="mt-2 text-sm text-red-600">{errors.notionId}</p>
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
      <form onSubmit={handleSubmit} className="space-y-6">
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
            <Button type="submit">申し込む</Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateNotionBlogPage;
