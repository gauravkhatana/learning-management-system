import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
 
const f = createUploadthing();
 
const handleAuth = ()=>{
    const {userId} = auth();
    if(!userId){
        throw new UploadThingError("Unauthorized");
    }
    return {userId};
} 
 
export const ourFileRouter = {
    courseImage: f({ image: {maxFileCount: 1, maxFileSize: "4MB"}})
    .middleware(()=>handleAuth())
    .onUploadComplete(()=>{}),
    courseAttachment: f(["text", "image", "video", "audio", "pdf",])
    .middleware(()=>handleAuth())
    .onUploadComplete(()=>{}),
    chapterVideo: f({video: {maxFileCount: 1, maxFileSize: "512GB"}})
    .middleware(()=>handleAuth())
    .onUploadComplete(()=>{}),
  
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;





// // FileRouter for your app, can contain multiple FileRoutes
// export const ourFileRouter = {
//     // Define as many FileRoutes as you like, each with a unique routeSlug
//     imageUploader: f({ image: { maxFileSize: "4MB" } })
//       // Set permissions and file types for this FileRoute
//       .middleware(async ({ req }) => {
//         // This code runs on your server before upload
//         const user = await auth(req);
   
//         // If you throw, the user will not be able to upload
//         if (!user) throw new UploadThingError("Unauthorized");
   
//         // Whatever is returned here is accessible in onUploadComplete as `metadata`
//         return { userId: user.id };
//       })
//       .onUploadComplete(async ({ metadata, file }) => {
//         // This code RUNS ON YOUR SERVER after upload
//         console.log("Upload complete for userId:", metadata.userId);
   
//         console.log("file url", file.url);
   
//         // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
//         return { uploadedBy: metadata.userId };
//       }),
//   } satisfies FileRouter;