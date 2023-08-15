interface Entry {
  id: string | number;
  name: string;
}

export default function List(props: { entries: Entry[] }) {
  const renderEntries = () => {
    return props.entries.map((entry) => (
      <tr
        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        key={entry.id}
      >
        <td
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {entry.name}
        </td>
      </tr>
    ));
  };
  return (
    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
      <div className="text-gray-900 dark:text-gray-100">
        <div className="flex flex-wrap justify-start items-center p-4">
          <div className={`my-2 text-blue-600`}>
            {/* <Search /> */} Search feature is coming soon ...
          </div>
        </div>

        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
              </tr>
            </thead>
            <tbody>{renderEntries()}</tbody>
          </table>
        </div>

        {
          /* <div className={`px-4`}>
              <Pagination meta={companies.meta}></Pagination>
          </div> */
        }
      </div>
    </div>
  );
}
