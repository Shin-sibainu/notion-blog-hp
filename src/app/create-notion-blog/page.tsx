"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const schema = z.object({
  email: z.string().email("有効なメールアドレスを入力してください"),
  name: z.string().min(1, "名前は必須です"),
  template: z.string().min(1, "テンプレートを選択してください"),
  notionToken: z.string().min(1, "NotionTokenは必須です"),
  notionId: z.string().min(1, "NotionIdは必須です"),
});

type FormData = z.infer<typeof schema>;

const CreateNotionBlogPage: React.FC = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      name: "",
      template: "",
      notionToken: "",
      notionId: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    // ここでバックエンドAPIにデータを送信する処理を追加します
  };

  return (
    <div className="py-20 px-4 max-w-2xl mx-auto mb-20">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Notionブログ無料申込み</h1>
        <p className="text-gray-600">
          ドメイン指定なしは無料です。カスタムドメインの場合は別途料金がかかります。
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>名前</FormLabel>
                <FormControl>
                  <Input placeholder="山田太郎" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>メールアドレス</FormLabel>
                <FormControl>
                  <Input placeholder="your@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="template"
            render={({ field }) => (
              <FormItem>
                <FormLabel>テンプレート</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="テンプレートを選択してください" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="template1">テンプレート1</SelectItem>
                    <SelectItem value="template2">テンプレート2</SelectItem>
                    <SelectItem value="template3">テンプレート3</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="notionToken"
            render={({ field }) => (
              <FormItem>
                <FormLabel>NotionToken</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  あなたのNotionアカウントのアクセストークンを入力してください。
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="notionId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>NotionId</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  ブログを作成するNotionページのIDを入力してください。
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            申し込む
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateNotionBlogPage;
