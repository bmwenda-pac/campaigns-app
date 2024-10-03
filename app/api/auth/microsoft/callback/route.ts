import { lucia } from "@/lib/lucia";
import { microsoftOAuthClient } from "@/lib/microsoftOAuth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { departments, users } from "@/db/schema";

export async function GET(req: NextRequest, res: Response) {
  const url = req.nextUrl;
  console.log(url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  if (!code || !state) {
    console.log("No code or state");
    return new Response("Invalid Request", { status: 400 });
  }

  const codeVerifier = cookies().get("codeVerifier")?.value;
  const savedState = cookies().get("state")?.value;

  if (!codeVerifier || !savedState) {
    console.log("No code verifier or state");
    return new Response("Invalid Request", { status: 400 });
  }

  const { accessToken, accessTokenExpiresAt } =
    await microsoftOAuthClient.validateAuthorizationCode(code, codeVerifier);

  console.log({ accessToken, accessTokenExpiresAt });

  const endpoint =
    "https://graph.microsoft.com/beta/me?$select=id,displayName,surname,jobTitle,department,userPrincipalName,mail,mobilePhone,mail,officeLocation,preferredLanguage";

  const microsoftResponse = await fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const microsoftData = (await microsoftResponse.json()) as {
    "@odata.context": string;
    id: string;
    displayName: string;
    surname: string;
    jobTitle: string;
    department: string;
    userPrincipalName: string;
    mail: string;
    mobilePhone: any;
    officeLocation: string;
    preferredLanguage: any;
  };

  let userId: string = microsoftData.id;

  let departmentName = microsoftData.department || "Marketing";

  const existingUser = await db.query.users.findFirst({
    where: eq(users.id, microsoftData.id),
  });

  console.log("existingUser >>>>>>", existingUser);

  const department = await db.query.departments.findFirst({
    where: eq(departments.departmentName, departmentName),
  });

  if (existingUser) {
    userId = microsoftData.id;
    console.log("There is an existingUser >>>>>>>>>");
  } else {
    const user = await db.insert(users).values({
      id: microsoftData.id,
      departmentId: department?.departmentId,
      displayName: microsoftData.displayName,
      email: microsoftData.userPrincipalName,
      surname: microsoftData.surname,
      jobTitle: microsoftData.jobTitle,
      officeLocation: microsoftData.officeLocation,
    });

    console.log({ user });
  }

  const session = await lucia.createSession(userId, {});
  const sessionCookie = await lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  redirect("/");

  // const myHeaders = new Headers();
  // myHeaders.append("Authorization", `Bearer ${accessToken}`);

  // const requestOptions: RequestInit = {
  //   method: "GET",
  //   headers: myHeaders,
  //   redirect: "follow",
  // };

  // let config = {
  //   method: "get",
  //   maxBodyLength: Infinity,
  //   url: "https://graph.microsoft.com/beta/me?$select=id,displayName,surname,jobTitle,department,userPrincipalName,mail,mobilePhone,mail,officeLocation,preferredLanguage",
  //   headers: {
  //     Authorization: `Bearer ${accessToken}`,
  //   },
  //   timeout: 10000,
  // };

  // await axios
  //   .request(config)
  //   .then((response) => {
  //     console.log(JSON.stringify(response.data));
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  // await fetch(endpoint, requestOptions)
  //   .then((response) => response.text())
  //   .then((result) => console.log(result))
  //   .catch((error) => console.log(error));

  // const microsoftResponse = await fetchMicrosoftData(endpoint, accessToken);

  // console.log("Microsoft data >>>>", microsoftResponse);

  // try {
  //   const microsoftResponse = await axios
  //     .get(endpoint, {
  //       headers: { Authorization: `Bearer ${accessToken}` },
  //       timeout: 10000,
  //     })
  //     .then((res) => {
  //       console.log(res);
  //     });
  //   console.log("Microsoft data >>>>>", microsoftResponse);
  // } catch (error: any) {
  //   if (error.cause && error.cause.errors) {
  //     const errorsArray = error.cause.errors;
  //     console.log(errorsArray);

  //     // Access individual errors
  //     errorsArray.forEach((err: any, index: number) => {
  //       console.log(`Error ${index + 1}:`, err);
  //     });
  //   } else {
  //     console.log("No errors array found.");
  //   }
  // }

  // await fetch(
  //   "https://graph.microsoft.com/beta/me?$select=id,displayName,surname,jobTitle,department,userPrincipalName,mail,mobilePhone,mail,officeLocation,preferredLanguage",
  //   {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   }
  // )
  //   .then((val) => console.log("Microsoft data >>>>>", val))
  //   .catch((err) => console.error({ Error: err }));

  // const microsoftData = (await microsoftResponse.json()) as {
  //   "@odata.context": string;
  //   id: string;
  //   displayName: string;
  //   surname: string;
  //   jobTitle: string;
  //   department: string;
  //   userPrincipalName: string;
  //   mail: string;
  //   mobilePhone: any;
  //   officeLocation: string;
  //   preferredLanguage: string;
  //   photo: { "@odata.type": string };
  // };

  // console.log({ user_data: microsoftData });

  // let userId: string = "fgfdg3";

  // const department = await db.query.departments.findFirst({
  //   where: eq(departments.departmentName, microsoftData.department),
  // });

  // const existingUser = await db.query.users.findFirst({
  //   where: eq(users.id, microsoftData.id),
  // });

  // if (existingUser) {
  //   userId = existingUser.id;
  // } else {
  //   const user = await db.insert(users).values({
  //     id: microsoftData.id,
  //     displayName: microsoftData.displayName,
  //     email: microsoftData.userPrincipalName,
  //     departmentId: department?.departmentId,
  //     profilePicture: microsoftData.photo["@odata.type"],
  //   });

  //   console.log({ user: user });
  //   userId = microsoftData.id;
  // }

  // const session = await lucia.createSession(userId, {});
  // const sessionCookie = await lucia.createSessionCookie(session.id);
  // cookies().set(
  //   sessionCookie.name,
  //   sessionCookie.value,
  //   sessionCookie.attributes
  // );

  // return redirect("/");
}

// http://localhost:3000/api/auth/microsoft/callback?code=0.ATEAjENWElkyo0a-yhdXnEr0BzsIh1LxV15Epg5N4uA5h4kxAAA.AgABBAIAAAApTwJmzXqdR4BN2miheQMYAgDs_wUA9P_RsOf9SsgcBnzh8T7GxPXutCV43qlGkfAQ1Lr7Q-DwLIYrEI16PVqr7f-V_uxMTjOv9SNc5db1fORwKkWc5wwPOtvEhbjVeOjvfvecQ3GtQ2HkeOCgwk2wzqHn5QHXqF0srEN1pDggdLoAn4gELCD-f2IiQy0yBue7TROsd32vrZUn4gkXxaXThzDuJs34ykGsHJkaErcSP-pVx8oaBIykJdZmfCuV608rmxUbGr_vxWF3hwGgF_ywkR9da3y1DbD22r4lhkTyru86kgbr-ZTOntD6SM70z8wsJrl0zmozWTQmEj6HFvf4PZ5PE7qrpmYm-YjKsE5kkYx6xtoyZV-JPIz4LpDjI2X3fZ1b9NO9h4VB0n-G-YLwIFtV6cEnSM1tLaRhufpjP52IVDDC_b7nmVFjCPWSTId51xznu2Rrg10WAZ5I7XNGUTyxBr-EM4zEnLp4epkEA0R8YSLsGWcxVL95FVjgYxMYd7DrcgI0BVxzYcmhddEf9S3mgN4jMrg0W7ERWd_yB8WRCVsCqQbG_iO7LXhnMVQj4oIds4rpRgnQJmdZU05wC6KEujB_00whTmHqQMH2vc-FWrI97NtXZEdIi0tQzyppYXrgfdRzDPO6pO6D3rbl0wSynvW96Eb2yYMkQ13dIOlA-AcywYvtsIqCFoLKed2z5HKJ_7O9MvJWcXSI5axQONgy5AVv-3SUPB_D5fcOzbC1ht7QGu5ssnQB08TAhupj_N8QxTpmhbH2Irrfh9fAkdasQGz2lBEzgx8&state=bHV4NhmNwDLNgbFRwCP30MmAg2LFpmDN03AkPBerz80&session_state=512bcd5b-6628-40db-80a0-3fd6ae2e1a3d#
//
// scopes: ["openid profile User.Read Mail.Read Mail.Send"]
