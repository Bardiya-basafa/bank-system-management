namespace Bank.domain.RepositoryContracts;

using Entities;


public interface IReportRepository {

    Task<Report> GetReportAsync();

}
