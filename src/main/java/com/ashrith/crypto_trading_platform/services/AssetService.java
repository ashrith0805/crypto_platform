package com.ashrith.crypto_trading_platform.services;
import com.ashrith.crypto_trading_platform.model.*;

import java.util.List;

public interface AssetService {

    Asset createAsset(User user, Coin coin, double quantity);

    Asset getAssetById(Long assetId) throws Exception;



    Asset getAssetByUserIdAndId(Long userId, String coinId) throws Exception;

    List<Asset> getUserAssets(Long userId) throws Exception;

    Asset updateAsset(Long assetId, double quantity) throws Exception;

    Asset findAssetByUserIdAndCoinId(Long userId, String coinId);

    void deleteAsset(Long assetId) throws Exception;

     Asset setSellPrice(Long assetId,double sellPrice) throws Exception;


}
