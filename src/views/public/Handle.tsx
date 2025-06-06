import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";

import HandleData from "../../components/public/HandleData";
import { getUserByHandle } from "../../api/UserAPI";

export default function Handle() {
    const params = useParams()
    const handle = params.handle!
    const { data, error, isLoading } = useQuery({
        queryFn: () => getUserByHandle(handle),
        queryKey: ['handle', handle],
        retry: 1
    })

  if (isLoading) return (
    <div className="min-h-screen my-60 text-center justify-center font-bold text-purple-700 text-2xl">
      Cargando...
    </div>
  );
  
  if (error) return <Navigate to="/404" />;
  if(data) return <HandleData data={data}/>
}