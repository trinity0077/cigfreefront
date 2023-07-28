const groupDataByMonth = (data) => {
    const groupedData = Array(7).fill(0);
    const currentDate = new Date();

    data.forEach((element) => {
      const itemDate = new Date(element.dateSmoked);
      const diffMonths = (currentDate.getMonth() - itemDate.getMonth() + 12) % 12;
      if (diffMonths < 7) {
        groupedData[diffMonths] += element.smokedCig;
      }
    });
    return groupedData.reverse();
  };

    export { groupDataByMonth } ;