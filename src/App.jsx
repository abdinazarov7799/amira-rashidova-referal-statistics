import {useEffect, useState} from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";

function App() {
    const [data,setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(100);

    useEffect(() => {
        axios({
            method: 'get',
            url: "http://localhost:8080/api/users/get-all",
            params: {
                page,
                size,
            }
        }).then(response => {
            setData(response?.data.data);
            setLoading(false);
        }).catch(error => {
            console.error('Error fetching data:', error);
            setLoading(false);
        });
    }, [page, size]);

    return (
      <div className="min-h-full">
          <main>
              <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                  <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                          <thead
                              className="text-xs text-gray-700 uppercase bg-gray-50">
                          <tr>
                              <th scope="col" className="px-6 py-3">
                                  №
                              </th>
                              <th scope="col" className="px-6 py-3">
                                  Name
                              </th>
                              <th scope="col" className="px-6 py-3">
                                  Chat ID
                              </th>
                              <th scope="col" className="px-6 py-3">
                                  Comments
                              </th>
                              <th scope="col" className="px-6 py-3">
                                  Reactions
                              </th>
                              <th scope="col" className="px-6 py-3">
                                  Points
                              </th>
                          </tr>
                          </thead>
                          <tbody>
                          {data?.content?.map((item, index) => (
                              <tr key={index} className="text-white">
                                  <td className="px-6 py-4">{index+1}</td>
                                  <td className="px-6 py-4">{item?.name}</td>
                                  <td className="px-6 py-4">{item?.chatId}</td>
                                  <td className="px-6 py-4">{item?.comments}</td>
                                  <td className="px-6 py-4">{item?.reactions}</td>
                                  <td className="px-6 py-4">{item?.points}</td>
                              </tr>
                          ))}
                          </tbody>
                      </table>
                  </div>

                  <div className="mt-3">
                      <ReactPaginate
                          pageCount={data?.totalPages}
                          pageRangeDisplayed={3}
                          initialPage={page}
                          previousLabel={<svg className="w-2.5 h-2.5 rtl:rotate-180 text-white" aria-hidden="true"
                                              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="M5 1 1 5l4 4"/>
                          </svg>}
                          nextLabel={<svg className="w-2.5 h-2.5 rtl:rotate-180 text-white" aria-hidden="true"
                                          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="m1 9 4-4-4-4"/>
                          </svg>}
                          breakLabel={"..."}
                          onPageChange={({selected}) => setPage(selected)}
                          renderOnZeroPageCount={null}
                      />
                  </div>
              </div>
          </main>
      </div>
    )
}

export default App
