﻿using DID.Entitys;
using DID.Helps;
using Microsoft.Extensions.Caching.Memory;

namespace DID.Controllers
{
    /// <summary>
    /// 支付信息服务接口
    /// </summary>
    public interface IPayService
    {
        /// <summary>
        /// 添加支付信息
        /// </summary>
        /// <param name="req"></param>
        /// <param name="mail"></param>
        /// <param name="code"></param>
        /// <returns></returns>
        Task<Response> AddPayment(Payment req, string mail, string code);

        /// <summary>
        /// 删除支付信息
        /// </summary>
        /// <param name="payId"></param>
        /// <returns></returns>
        Task<Response> DeletePayment(string payId);

        /// <summary>
        /// 修改支付信息
        /// </summary>
        /// <param name="req"></param>
        /// <returns></returns>
        Task<Response> UpdatePayment(Payment req);

        /// <summary>
        /// 获取支付信息
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        Task<Response<List<Payment>>> GetPayment(string userId);

    }
    /// <summary>
    /// 支付信息服务
    /// </summary>
    public class PayService : IPayService
    {
        private readonly ILogger<PayService> _logger;

        private readonly IMemoryCache _cache;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="logger"></param>
        /// <param name="cache"></param>
        public PayService(ILogger<PayService> logger, IMemoryCache cache)
        {
            _logger = logger;
            _cache = cache;
        }
        /// <summary>
        /// 添加支付信息
        /// </summary>
        /// <param name="req"></param>
        /// <param name="mail"></param>
        /// <param name="code"></param>
        /// <returns></returns>
        public async Task<Response> AddPayment(Payment req,string mail, string code)
        {
            var usercode = _cache.Get(mail)?.ToString();
            if (usercode != code)
                return InvokeResult.Fail<string>("1");//验证码错误!
            using var db = new NDatabase();
            req.PaymentId = Guid.NewGuid().ToString();
            req.CreateDate = DateTime.Now;
            await db.InsertAsync(req);
            return InvokeResult.Success("添加成功!");
        }
        /// <summary>
        /// 删除支付信息
        /// </summary>
        /// <param name="payId"></param>
        /// <returns></returns>
        public async Task<Response> DeletePayment(string payId)
        {
            using var db = new NDatabase();
            var item = await db.SingleByIdAsync<Payment>(payId);
            item.IsDelete = IsEnum.是;
            await db.UpdateAsync(item);
            return InvokeResult.Success("删除成功!");
        }
        /// <summary>
        /// 获取支付信息
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public async Task<Response<List<Payment>>> GetPayment(string userId)
        {
            using var db = new NDatabase();
            var list = await db.FetchAsync<Payment>("select * from Payment where DIDUserId = @0 and IsDelete = @1", userId, IsEnum.否);
            return InvokeResult.Success(list);
        }
        /// <summary>
        /// 修改支付信息
        /// </summary>
        /// <param name="req"></param>
        /// <returns></returns>
        public async Task<Response> UpdatePayment(Payment req)
        {
            using var db = new NDatabase();
            req.UpdateDate = DateTime.Now;
            await db.UpdateAsync(req);
            return InvokeResult.Success("更新成功!");
        }
    }
}
