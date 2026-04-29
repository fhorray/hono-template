import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '~/client/components/ui/tabs';

export default function TestPage() {
  return (
    <div className="p-8">
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
}
