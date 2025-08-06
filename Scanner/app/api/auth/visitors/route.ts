import { NextResponse } from "next/server";
import connectToDatabase from "@/app/lib/mongodb";
import Visitor from "@/app/models/lowerUserModel";


export async function POST(req: Request) {
    await connectToDatabase();
    const body = await req.json();
    const {serviceId} = body ;
    // //console.log('service_id', body);

    try {    
        let loweruserData = await Visitor.find({ service_id : serviceId });
    
        return NextResponse.json({
          success: true,
          visitorList: loweruserData,
        });
      } catch (err) {
        //console.log(err);
        return NextResponse.json({
          success: false,
          err: err,
        });
      }
}