import { NextResponse } from "next/server";
import connectToDatabase from "@/app/lib/mongodb";
import Visitor from "@/app/models/lowerUserModel";
import moment from "moment-timezone" ;

export async function POST(req: Request) {
    await connectToDatabase();
    const body = await req.json();
    //console.log('body', body);
    const { validatorId, visitorId } = body;

    try {
        let visitorData = await Visitor.find({ _id: visitorId });
        //console.log('visitordata' , visitorData);
        if (visitorData.length === 0) {
            return NextResponse.json({
                verified: false,
                success: false,
                message: "InValid QR"
            })
        }


        let validatorMatched = visitorData[0].validater_list.includes(validatorId);
        // let status = visitorData[0].validation_status;

        if (validatorMatched === false) {
            return NextResponse.json({
                verified: false,
                message: "Wrong Ticket"
            })
        }

        // if (status === true) {
        //     return NextResponse.json({
        //         verified: false,
        //         message: "Ticket Expired"
        //     })
        // }

        if (Date.now() > Number(visitorData[0].expired_time)) {
            return NextResponse.json({
                verified: false,
                message: "Ticket Expired"
            })
        }

        if (Number(visitorData[0].remain_scans) > 0) {
            const timestampIST = moment().tz("Asia/Kolkata").format("DD-MM-YYYY hh:mm A");
            let result = await Visitor.findByIdAndUpdate(
                { _id: visitorId },
                {
                    $set: {
                        validation_status: true,
                        remain_scans: Number(visitorData[0].remain_scans) - 1,
                    },
                    $push: { time_stamps: timestampIST }
                },
                { new: true }
            )
                .exec();
            return NextResponse.json({
                verified: true,
                vdata: visitorData[0],
                message: "Visitor Verified"
            })
        } else {
            return NextResponse.json({
                verified: false,
                message: "Ticket Expired"
            })
        }



    } catch (error) {
        //console.log(error)
        return NextResponse.json({
            err: error,
            message: "Error !!!"
        })

    }
}
